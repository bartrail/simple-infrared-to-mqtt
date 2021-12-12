class Message {
    static toMqtt(value: any, config: any): string {
        const valueAsStr = value.toString();
        if (config.mqtt.hasOwnProperty('message') === false) {
            return valueAsStr;
        }

        return config.mqtt.message[value];
    }
}

export default Message;
