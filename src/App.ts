import MqttClient from './MqttClient';

import { Gpio } from 'onoff';
import Message from './Message';

if (!Gpio.accessible) {
    throw new Error('GPIO is unaccessible - are you running on a Raspberry PI?');
}

async function App(config: Config) {
    const mqttClient = new MqttClient(config.mqtt.host, config.mqtt.topic);
    const irDetector = new Gpio(config.gpio, 'in', 'rising', { debounceTimeout: 10 });

    await mqttClient.connect();
    await mqttClient.publish('running');

    const readGpio = async (err: any, value: any) => {
        if (err) {
            console.error(err);
            return;
        }

        await mqttClient.publish(Message.toMqtt(value, config));
    };

    setInterval(() => {
        irDetector.read(readGpio);
    }, config.status_interval * 1000);

    setInterval(() => {
        mqttClient.publish('running');
    }, config.liveness_interval * 1000)
}

export default App;
