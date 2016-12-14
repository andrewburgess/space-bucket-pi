const _     = require('lodash');
const execa = require('execa');
const path  = require('path');

const config = require('../config');

let latest = { light: 0 };

function getSingleReading(pin) {
    return execa('python', [
        path.join(__dirname, 'photocell.py'),
        pin.toString()
    ])
    .then((result) => {
        return parseInt(result.stdout, 10);
    });
}

/**
* Reads 20 samples from the photocell sensor and returns the mean value
* which should correspond to how bright the area is
*
* VALUES:
*     * ~10  - very bright
*     * ~25  - bright
*     * ~55  - light
*     * ~100 - dim
*     * ~150 - dark
*/
module.exports.read = (samples = 5) => {
    const pin = config.get('photocell.pin');
    const readings = [];

    return _.reduce(_.range(samples), (promise) => {
        return promise.then(() => {
            return getSingleReading(pin)
            .then((value) => {
                readings.push(value);
            });
        });
    }, Promise.resolve())
    .then(() => {
        latest =  _.mean(readings);

        return latest;
    });
};

module.exports.getLatest = () => { return { light: latest }; };
