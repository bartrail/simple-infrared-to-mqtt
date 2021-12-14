interface Config {
    gpio: number;
    scan_interval: number;
    mqtt: {
        host: string;
        status: {
            topic: string;
            message: {
                '0': string;
                '1': string;
            };
        };
        liveness: {
            topic: string;
            requestPayload: string;
            responsePayload: string;
        };
    };
}
