const bodyParser  = require('body-parser');
const compression = require('compression');
const express     = require('express');
const http        = require('http');
const logger      = require('winston');
const path        = require('path');

const config = require('../config');

const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
} else {
    const config = require('../tools/webpack.development');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    let compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use('/', express.static(path.join(__dirname, '../', 'client', 'public')));

app.use(require('./api'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
});

module.exports.start = () => {
    server.on('listening', () => {
        logger.info(`server listening on 0.0.0.0:${config.get('port')}`);
    });

    server.on('error', (err) => {
        logger.error(err);
    });

    server.listen(config.get('port'), '0.0.0.0');
};
