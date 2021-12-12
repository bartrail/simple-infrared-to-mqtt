# simple-infrared-to-mqtt

Raspberry Pi infrared detector that sends it's status to an mqtt broker

## Installation

Requirements: `Node 16`

-   `git clone https://github.com/bartrail/simple-infrared-to-mqtt.git`
-   cd `simple-infrared-to-mqtt`
-   `npm install`
-   `npm run build`
-   `npm run app`

## Configuration

copy `config.json.dist` to `config.json` and set up

- your GPIO Port where the IR Module is connected (typically from `D0` on the IR module to the desired GPIO)
- MQTT Host Address
- MQTT Topic

More information on how to connect the IR Sensor to the Raspberry Pi:
https://www.uugear.com/portfolio/using-light-sensor-module-with-raspberry-pi/

## Compile & Run

-   run `npm run dev` for local testing
-   run `npm build`
-   run `npm run app`

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

##
