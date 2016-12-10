const _	      = require('lodash');
const BME280 = require('node-bme280');
const logger = require('winston');

const barometer = new BME280();
let running = false;

const start = () => {
	return new Promise((resolve, reject) => {
		barometer.begin((err) => {
			if (err) {
				logger.error('error initializing BME280', err);
				return reject(err);
			}
			
			logger.info('BME280 running');
			return resolve();
		});
	});
};

module.exports.read = () => {
	return start()
	.then(() => {
		return new Promise((resolve, reject) => {
			barometer.readPressureAndTemparature((err, pressure, temperature, humidity) => {
				if (err) {
					return reject(err);
				}
				
				return resolve({
					temperature: _.round(temperature, 2),
					pressure: _.round((pressure / 100), 2),
					humidity: _.round(humidity, 2)
				});
			});
		});
	});
};

