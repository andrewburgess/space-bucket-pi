const logger   = require('winston');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/space-bucket');

const Recording = mongoose.model('Recording', {
    temperature: Number,
    humidity: Number,
    pressure: Number,
    light: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.save = (values) => {
    let recording = new Recording(values);

    logger.debug('saving recording', recording);

    return recording.save();
};
