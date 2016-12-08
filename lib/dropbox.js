const Dropbox = require('dropbox');
const logger  = require('winston');

const config = require('../config');

const dropbox = new Dropbox({ accessToken: config.get('dropbox.token') });

module.exports.uploadFile = (filename, file) => {
    logger.debug(`uploading ${filename}`);
    return dropbox.filesUpload({
        contents: file,
        path: filename,
        autorename: true
    })
    .then((result) => {
        logger.debug(`file ${filename} uploaded`);
        logger.debug(result);
    });
};
