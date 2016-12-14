const express = require('express');
const moment  = require('moment');

const router = new express.Router();

router.get('/history', (req, res) => {
    return res.json([{
        temperature: 24.2,
        humidity: 54.3,
        pressure: 1016.2,
        createdAt: moment().subtract(3, 'days')
    }, {
        temperature: 23.4,
        humidity: 55.1,
        pressure: 1017.2,
        createdAt: moment().subtract(2, 'days')
    }, {
        temperature: 23.1,
        humidity: 55.3,
        pressure: 1015.9,
        createdAt: moment().subtract(1, 'days')
    }, {
        temperature: 22.9,
        humidity: 55.4,
        pressure: 1016.2,
        createdAt: moment()
    }]);
});

module.exports = router;
