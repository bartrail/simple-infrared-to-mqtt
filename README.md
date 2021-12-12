# simple-infrared-to-mqtt

Raspberry Pi infrared detector that sends it's status to an mqtt broker

## Installation

Requirements: `Node 16`

-   `git clone https://github.com/bartrail/simple-infrared-to-mqtt.git`
-   `cd simple-infrared-to-mqtt`
-   `npm install`
-   `npm run build`
-   `npm run app`

## Configuration

copy `config.json.dist` to `config.json` and set up

- `gpio` your GPIO Port where the IR Module is connected (typically from `D0` on the IR module to the desired GPIO)
- `interval` the interval in seconds how often the GPIO is scanned
- `mqtt` 
  - `mqtt.host` Host Address  
  - `mqtt.topic` Topic for mqtt
  - `mqtt.message` Message translation (GPIO values are `"0"` or `"1"` that can be translated to the given string ("open"/"closed" by default))

```json
{
    "gpio": 4,
    "interval": 5,
    "mqtt": {
        "host": "mqtt://192.168.178.54:1883",
        "topic": "/home/garage-door/status",
        "message": {
            "0": "closed",
            "1": "open"
        }
    }
}
```

More information on how to connect the IR Sensor to the Raspberry Pi:
https://www.uugear.com/portfolio/using-light-sensor-module-with-raspberry-pi/

## Compile & Run

- run `npm run dev` for local testing
- run `npm build`
- run `npm run app`

## Autostart

To run this little app at the autostart of your system:
- run `sudo cp simple-infrared-to-mqtt.service /lib/systemd/system/simple-infrared-to-mqtt.service` to copy the systemctl config file to the correct directory
- open it with `sudo nano /lib/systemd/system/simple-infrared-to-mqtt.service` and adjust the path at the line that 
  starts with `ExecStart=` to fit your local installation directory of the project. Default is in `/home/pi/`
- tell systemctl that there is a new service in town 
  - `sudo systemctl daemon-reload`
  - `sudo systemctl enable simple-infrared-to-mqtt`
- start the service manually `sudo systemctl start simple-infrared-to-mqtt`
- try it by rebooting your pi and watch the MQTT messages to ensure it is running.

To stop the service manually, type `sudo systemctl stop simple-infrared-to-mqtt`

More details for systemd and nodejs can be found here: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/

## Troubleshooting

### How do I install NodeJS 16?

There are many ways - one would be using [NVM](https://www.jemrf.com/pages/how-to-install-nvm-and-node-js-on-raspberry-pi)
and then run `nvm use` inside the project directory, followed by `nvm install`. This will download and compile Node 16.
This takes quite some time on a Raspberry Pi Zero (> 2 hours).

I found this repository with precompiled binaries for Node16:
https://github.com/sdesalas/node-pi-zero

So I installed it using `$ wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v16.3.0.sh | bash`
and added this line to my `~/.bashrc`

```
# Add support for node CLI tools
export PATH=$PATH:/opt/nodejs/bin
```

## Used Libraries:

- OnOff https://github.com/fivdi/onoff
- MQTT https://github.com/mqttjs/MQTT.js
- Async MQTT https://github.com/mqttjs/async-mqtt

### For Development:

- Typescript https://github.com/microsoft/TypeScript
- Prettier https://github.com/prettier/prettier
