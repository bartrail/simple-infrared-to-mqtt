import { AsyncClient, AsyncMqttClient, connectAsync, IPublishPacket } from 'async-mqtt';
import { ISubscriptionGrant, OnMessageCallback } from 'mqtt/types/lib/client';

class MqttClient {
    private client: AsyncMqttClient | undefined;
    private host: string;
    private topic: string;

    constructor(host: string, topic: string) {
        this.host = host;
        this.topic = topic;
    }

    async connect() {
        this.client = await connectAsync(this.host);
        if (this.client.connected) {
            console.log('MQTT connected to %s', this.host);
        }
    }

    async publish(value: string, topic?: string) {
        if (!this.client || !this.client.connected) {
            console.warn('Client not connected! ');
            return;
        }

        try {
            const topicToSend = typeof topic === 'string' ? topic : this.topic;
            await this.client.publish(topicToSend, value);
            console.log('Send message [%s/%s]', topicToSend, value);
        } catch (e) {
            console.log('Error publish message', e);
        }
    }

    async subscribe(
        onMessage: (topic: string, message: string) => void,
        onSubscriptionRegistered?: (subscription: ISubscriptionGrant) => void,
        topic?: string,
    ) {
        if (!this.client || !this.client.connected) {
            console.warn('Client not connected! ');
            return;
        }

        const topicToSubscribeTo = typeof topic === 'string' ? topic : this.topic;
        const incomingMessages = await this.client.subscribe(topicToSubscribeTo, { qos: 2 });
        incomingMessages.map((subscriptionGrant: ISubscriptionGrant) => {
            if (onSubscriptionRegistered) {
                onSubscriptionRegistered(subscriptionGrant);
            }
        });

        this.client.on('message', function (topic: string, message: Buffer, packet: IPublishPacket) {
            onMessage(topic, message.toString());
        });
    }
}

export default MqttClient;
