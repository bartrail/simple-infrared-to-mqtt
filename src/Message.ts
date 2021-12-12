class Message {
    static toMqtt(value: any, config: any): string {
        const valueAsStr = value.toString();
        if (config.hasOwnProperty('message') === false) {
            return valueAsStr;
        }

        return config.message[value];
    }
}

export default Message;
