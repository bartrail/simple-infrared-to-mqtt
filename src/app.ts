import config from '../config.json';
import MqttClient from './MqttClient';

import {Gpio} from 'onoff';

if (!Gpio.accessible) {
    throw new Error('GPIO is unaccessible - are you running on a Raspberry PI?');
}

async function run() {
    const client = new MqttClient(config.MQTT.host, config.MQTT.topic);
    await client.connect();

    const irDetector = new Gpio(config.GPIO_IR, 'in');
    irDetector.watch((err, value) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(value);
        client.publish(value.toString());
    });
}

run();
