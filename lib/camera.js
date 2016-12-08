const _     = require('lodash');
const execa = require('execa');

const CAMERA_EXECUTABLE = 'raspistill';

module.exports.captureImage = (options = []) => {
    let params = [].concat(options);
    params.push('-');

    return execa(CAMERA_EXECUTABLE, params, {
        encoding: 'buffer'
    })
    .then((result) => {
        return result.stdout;
    });
};
