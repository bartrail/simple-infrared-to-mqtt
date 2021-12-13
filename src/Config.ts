interface Config {
    gpio: number,
    status_interval: number,
    liveness_interval: number,
    mqtt : {
        host: string,
        topic: string,
        message : {
            "0" : string,
            "1" : string
        }
    }
}
