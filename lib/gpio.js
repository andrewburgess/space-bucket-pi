const gpio = require('pi-gpio');

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

function closePin(pin) {
    return new Promise((resolve, reject) => {
        gpio.close(pin, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

module.exports.read = (pin) => {
    return new Promise((resolve, reject) => {
        gpio.open(pin, 'input', (err) => {
            if (err) {
                return reject(err);
            }

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
        gpio.open(pin, 'output', (err) => {
            if (err) {
                return reject(err);
            }

            writeOutput(pin, value)
            .then(resolve)
            .catch(reject);
        });
    })
    .then(() => {
        return closePin(pin);
    });
};
