const express = require('express');
const logger  = require('winston');
const moment  = require('moment');

//const db = require('../../lib/db');

const router = new express.Router();

router.get('/history', (req, res) => {
    res.json([]);
    /*let start = moment(req.query.start || moment().subtract(1, 'days'));
    let end = moment(req.query.end || moment());
    db.Recording.find({
        createdAt: {
            $gte: start,
            $lte: end
        }
    })
    .then((results) => {
        return res.json(results);
    })
    .catch((err) => {
        logger.error(err);
        return res.status(500).json({
            error: true,
            message: err.message,
            stack: err.stack
        });
    });*/
});

module.exports = router;
