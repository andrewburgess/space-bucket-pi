const gpio = require('rpi-gpio');

function readInput(pin) {
    return new Promise((resolve, reject) => {
        gpio.read(pin, (err, value) => {
            if (err) {
                return reject(err);
            }

            return resolve(value);
        });
    });
}

function writeOutput(pin, value) {
    return new Promise((resolve, reject) => {
        gpio.write(pin, value, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

function closePin() {
    return new Promise((resolve, reject) => {
        gpio.destroy(() => {
            return resolve();
        });
    });
}

module.exports.initialize = (pin) => {
    return new Promise((resolve, reject) => {
        gpio.setup(pin, gpio.DIR_IN, (err) => {
            if (err) {
                return reject(err);
            }

            gpio.setup(pin, gpio.DIR_OUT, (err2) => {
                if (err2) {
                    return reject(err2);
                }

                return resolve();
            });
        });
    });
}

module.exports.read = (pin) => {
    return readInput(pin);
};

module.exports.write = (pin, value) => {
    return writeOutput(pin, value);
};

process.on('beforeExit', () => {
    gpio.destroy();
});
