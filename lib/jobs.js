const _       = require('lodash');
const CronJob = require('cron').CronJob;
const fs      = require('fs');
const moment  = require('moment');

const config       = require('../config');
const camera       = require('./camera');
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
	const cronJob = new CronJob(config.get('cron'), captureTimelapseImage);
	cronJob.start();
	
	startEnvironmentReadings();
}

