import {AsyncClient, AsyncMqttClient, connectAsync} from "async-mqtt";

class MqttClient {
    private client: AsyncMqttClient | undefined
    private host: string;
    private topic: string

    constructor(host: string, topic: string) {
        this.host = host;
        this.topic = topic;
    }

    async connect() {
        this.client = await connectAsync(this.host);
        console.log("MQTT connected to %s", this.host);
    }

    async publish(value: string) {
        if (!this.client || !this.client.connected) {
            console.error("Client not connected!");
            return;
        }
        try {
            await this.client.publish(this.topic, value);
            await this.client.end();
        } catch (e) {
            console.log("Error publish message", e);
        }
    }
}

export default MqttClient;
