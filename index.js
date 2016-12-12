const logger  = require('winston');

const config  = require('./config');
const jobs    = require('./lib/jobs');
const pkg     = require('./package.json');
const server  = require('./server');

logger.add(logger.transports.File, { filename: config.get('log'), level: 'info' });

console.log(`\nSPACEBUCKET v${pkg.version}\n\n`);

server.start()
.then(() => {
    jobs.start();
});
