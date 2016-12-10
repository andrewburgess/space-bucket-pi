const _     = require('lodash');
const execa = require('execa');

const CAMERA_EXECUTABLE = 'raspistill';

const DEFAULT_PARAMETERS = [
	'-w', '1920',
	'-h', '1080',
	'-q', '75',
	'-awb', 'auto',
	'-n',
	'-o', '-'
];

module.exports.captureImage = (options = []) => {
    let params = [].concat(options).concat(DEFAULT_PARAMETERS);

    return execa(CAMERA_EXECUTABLE, params, {
        encoding: 'buffer'
    })
    .then((result) => {
        return result.stdout;
    });
};
