const express = require('express');
const http    = require('http');
const logger  = require('winston');

const config = require('../config');

module.exports.start = () => {
    const app = express();
    const server = http.createServer(app);

    server.on('listening', () => {
        logger.info(`server listening on 0.0.0.0:${config.get('port')}`);
    });

    server.on('error', (err) => {
        logger.error(err);
    });

    server.listen(config.get('port'), '0.0.0.0');
};
