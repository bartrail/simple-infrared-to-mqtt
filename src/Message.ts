class Message {
    static toMqtt(value: any, config: Config): string {
        const valueAsStr = value.toString();
        if (config.mqtt.status.hasOwnProperty('message') === false) {
            return valueAsStr;
        }

        const message = config.mqtt.status.message;

        // @ts-ignore
        return message[valueAsStr];
    }
}

export default Message;
