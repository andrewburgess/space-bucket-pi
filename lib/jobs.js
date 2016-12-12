const _       = require('lodash');
const CronJob = require('cron').CronJob;
const fs      = require('fs');
const logger  = require('logger');
const moment  = require('moment');

const config       = require('../config');
const camera       = require('./camera');
const db           = require('./db');
const dropbox      = require('./dropbox');
const bme280       = require('./bme280');
const photocell    = require('./photocell');
const SocketServer = require('../server/api/socket');

function captureTimelapseImage() {
    const filename = `${moment().format('YYYYMMDDhhmmss')}.png`;
    camera.captureImage()
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
