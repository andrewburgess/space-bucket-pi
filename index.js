const CronJob = require('cron').CronJob;
const fs      = require('fs');
const logger  = require('winston');
const moment  = require('moment');

const config  = require('./config');
const camera  = require('./lib/camera');
const dropbox = require('./lib/dropbox');
const pkg     = require('./package.json');
const server  = require('./server');

logger.add(logger.transports.File, { filename: config.get('log'), level: 'info' });

console.log(`\nSPACEBUCKET v${pkg.version}\n\n`);

const cronJob = new CronJob(config.get('cron'), () => {
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
});

cronJob.start();
server.start();
