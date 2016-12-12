const _	     = require('lodash');
const BME280 = require('node-bme280');
const logger = require('winston');

const barometer = new BME280();

let started = false;

let latest = { temperature: 0, humidity: 0, pressure: 0 };

const start = () => {
    return new Promise((resolve, reject) => {
        barometer.begin((err) => {
            if (err) {
                logger.error('error initializing BME280', err);
                return reject(err);
            }

            logger.info('BME280 running');
            started = true;
            return resolve();
        });
    });
};

module.exports.read = () => {
    let promise;

    if (started) {
        promise = Promise.resolve();
    } else {
        promise = start();
    }

    return promise
    .then(() => {
        return new Promise((resolve, reject) => {
            barometer.readPressureAndTemparature((err, pressure, temperature, humidity) => {
                if (err) {
                    return reject(err);
                }

                latest = {
                    temperature: _.round(temperature, 2),
                    pressure: _.round((pressure / 100), 2),
                    humidity: _.round(humidity, 2)
                };

                return resolve(latest);
            });
        });
    });
};

module.exports.getLatest = () => latest;
