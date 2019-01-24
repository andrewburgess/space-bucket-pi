const { map, mean, range } = require("lodash")
const onoff = require("onoff")

let latest = { light: 0 }

function getSample() {
    const pin = parseInt(process.env.PHOTOCELL_PIN || "37", 10)
    let reading = 0

    const photocell = new onoff.Gpio(pin, "out")
    photocell.writeSync(0)

    while (photocell.readSync() == 0 && reading < 1000) {
        reading += 1
    }

    photocell.unexport()

    return reading
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
module.exports.read = () => {
    latest.light = mean(map(range(5), () => getSample()))

    return latest.light
}

module.exports.getLatest = () => {
    return { light: latest }
}
