var convict = require('convict');
var fs      = require('fs');
var path    = require('path');

const config = convict({
    cron: {
        doc: 'Cron schedule for capturing images',
        format: String,
        default: '0/30 * * * *',
        env: 'CRON',
        arg: 'cron'
    },
    dropbox: {
        token: {
            doc: 'Dropbox API Access Token',
            format: String,
            default: null,
            env: 'DROPBOX_TOKEN',
            arg: 'dropbox-token'
        }
    },
    log: {
        doc: 'Logfile location',
        format: String,
        default: path.join(__dirname, 'spacebucket.log'),
        env: 'LOG',
        arg: 'log'
    },
    photocell: {
        pin: {
            doc: 'Pin number to read photocell data from',
            format: Number,
            default: 29,
            env: 'PHOTOCELL_PIN',
            arg: 'photocell-pin'
        }
    },
    port: {
        doc: 'Express port to listen to',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    }
});

let env = process.env.NODE_ENV || 'production';
let configPath = path.join(__dirname, `config.${env}.json`);
if (fs.existsSync(configPath)) {
    config.loadFile(configPath);
}

config.validate();

module.exports = config;
