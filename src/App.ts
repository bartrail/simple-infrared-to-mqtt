import MqttClient from './MqttClient';

import { Gpio } from 'onoff';
import Message from './Message';
import { ISubscriptionGrant } from 'mqtt/types/lib/client';

if (!Gpio.accessible) {
    throw new Error('GPIO is unaccessible - are you running on a Raspberry PI?');
}

async function App(config: Config) {
    const irDetector = new Gpio(config.gpio, 'in', 'rising', { debounceTimeout: 10 });

    const mqttClientStatus = new MqttClient(config.mqtt.host, config.mqtt.status.topic);
    await mqttClientStatus.connect();

    const mqttClientLiveness = new MqttClient(config.mqtt.host, config.mqtt.liveness.topic);
    await mqttClientLiveness.connect();

    const readGpio = async (err: any, value: any) => {
        if (err) {
            console.error(err);
            return;
        }

        await mqttClientStatus.publish(Message.toMqtt(value, config));
    };

    const onLivenessRequest = (topic: string, message: string) => {
        if (topic !== config.mqtt.liveness.topic) {
            return;
        }
        if (message !== config.mqtt.liveness.requestPayload) {
            return;
        }

        mqttClientLiveness.publish(config.mqtt.liveness.responsePayload);
    };

    setInterval(() => {
        irDetector.read(readGpio);
    }, config.scan_interval * 1000);

    mqttClientLiveness.subscribe(onLivenessRequest);
}

export default App;
