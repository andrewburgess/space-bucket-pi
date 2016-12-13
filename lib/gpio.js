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

module.exports.read = (pin) => {
    return new Promise((resolve, reject) => {
        gpio.setup(pin, gpio.DIR_IN, () => {
            readInput(pin)
            .then(resolve)
            .catch(reject);
        });
    })
    .then((value) => {
        return closePin()
        .then(() => {
            return value;
        });
    });
};

module.exports.write = (pin, value) => {
    return new Promise((resolve, reject) => {
        gpio.setup(pin, gpio.DIR_OUT, (err) => {
            if (err) {
                return reject(err);
            }
            writeOutput(pin, value)
            .then(resolve)
            .catch(reject);
        });
    })
    .then(() => {
        return closePin();
    });
};

process.on('beforeExit', () => {
    gpio.destroy();
});
