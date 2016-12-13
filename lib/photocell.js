const _    = require('lodash');

const config = require('../config');
const gpio   = require('./gpio');

let latest = { light: 0 };

function getSingleReading(pin) {
    return gpio.write(pin, false)
    .then(() => {
        return new Promise((resolve) => {
            setTimeout(resolve, 0.5);
        });
    })
    .then(() => {
        const start = (new Date()).getTime();

        const check = () => {
            if ((new Date()).getTime() - start > 1000) {
                return 1;
            }

            return gpio.read(pin)
            .then((value) => {
                if (!value) {
                    return check();
                }

                return value;
            });
        };

        return check()
        .then(() => {
            const end = (new Date()).getTime();

            return end - start;
        });
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
module.exports.read = (samples = 10) => {
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
