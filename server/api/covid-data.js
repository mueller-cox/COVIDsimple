var express = require("express");
var CovidData = require("../models/covid-data");

var router = express.Router();

/**
 * state data request: localhost:5000/api/covid-data/states
 * fetches array of all historical data for every state, one entry/day/state */
router.get("/states", (req, res) => {
    CovidData.retrieveStates((err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

/**
 * state data request: localhost:5000/api/covid-data/XX
 * fetches array of all historical data for requested state, one entry/day */
router.get("/:state", (req, res) => {
    var state = req.params.state;

    CovidData.retrieveByState(state, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

/**
 * national data request: localhost:5000/api/covid-data
 * fetches array of nationally accumulated data, one entry/day */
router.get("/", (req, res) => {
    CovidData.retrieveNational((err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

module.exports = router;
