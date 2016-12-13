const _       = require('lodash');
const CronJob = require('cron').CronJob;
const fs      = require('fs');
const gm      = require('gm');
const logger  = require('winston');
const moment  = require('moment');

const bme280       = require('./bme280');
const config       = require('../config');
const camera       = require('./camera');
const db           = require('./db');
const dropbox      = require('./dropbox');
const photocell    = require('./photocell');
const SocketServer = require('../server/api/socket');

function captureTimelapseImage() {
    let { light } = photocell.getLatest();

    if (light > 150) {
        logger.debug('its dark, skipping a photoop');
        return;
    }

    const filename = `${moment().format('YYYYMMDDhhmmss')}.jpg`;
    camera.captureImage()
    .then((image) => {
        let values = _.extend({}, bme280.getLatest(), photocell.getLatest());

        return new Promise((resolve, reject) => {
            let date = moment().format('dddd MMM Do, YYYY');
            let time = moment().format('hh:mm A');
            gm(image, filename)
                .rotate('black', 270)
                .fill('black')
                .font('Arial')
                .fontSize(42)
                .drawText(11, 1713, `Temperature: ${_.round(values.temperature, 1)} °C`)
                .drawText(11, 1755, `Humidity: ${_.round(values.humidity, 1)}%`)
                .drawText(11, 1797, `Pressure: ${_.round(values.pressure, 1)} hPa`)
                .drawText(11, 1851, date)
                .drawText(11, 1891, time)
                .fill('white')
                .drawText(10, 1712, `Temperature: ${_.round(values.temperature, 1)} °C`)
                .drawText(10, 1754, `Humidity: ${_.round(values.humidity, 1)}%`)
                .drawText(10, 1796, `Pressure: ${_.round(values.pressure)} hPa`)
                .drawText(10, 1850, date)
                .drawText(10, 1890, time)
                .toBuffer('JPG', (err, buffer) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(buffer);
                });
        });
    })
    .then((image) => {
        fs.writeFileSync('latest.jpg', image);
        return dropbox.uploadFile(`/${filename}`, image);
    })
    .then(() => {
        logger.info(`${filename} saved`);
    })
    .catch((err) => {
        logger.error(err);
    });
}

function saveEnvironmentReadings() {
    let values = _.extend({}, bme280.getLatest(), photocell.getLatest());

    return db.save(values);
}

function startEnvironmentReadings() {
    const server = SocketServer.get();

    function readAll() {
        bme280.read()
        .then((bme) => {
            server.send('update', {
                type: 'ENVIRONMENT',
                payload: bme
            });
        })
        .then(() => {
            return photocell.read()
            .then(light => {
                server.send('update', {
                    type: 'ENVIRONMENT',
                    payload: {
                        light
                    }
                });
            });
        })
        .then(() => {
            setTimeout(readAll, 5000);
        });
    }

    setTimeout(readAll, 5000);
}

module.exports.start = () => {

    const cronJob = new CronJob(config.get('cron'), () => {
        captureTimelapseImage();
        saveEnvironmentReadings();
    });
    cronJob.start();

    startEnvironmentReadings();
};
