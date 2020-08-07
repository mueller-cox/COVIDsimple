const axios = require("axios");

/*require('dotenv').config();*/

class CovidData {
    static retrieveByState(state, callback) {
        axios
            .get(`https://covidtracking.com/api/v1/states/${state}/daily.json`)
            .then((res) => callback(null, res.data))
            .catch((err) => {
                console.log(err);
                callback({ error: "Could not reach CovidTracking API." });
            });
    }

    static retrieveNational(callback) {
        axios
            .get(`https://covidtracking.com/api/v1/us/daily.json`)
            .then((res) => callback(null, res.data))
            .catch((err) => {
                console.log(err);
                callback({ error: "Could not reach CovidTracking API." });
            });
    }

    static retrieveStates(callback) {
        axios
            .get(`https://covidtracking.com/api/v1/states/daily.json`)
            .then((res) => callback(null, res.data))
            .catch((err) => {
                console.log(err);
                callback({ error: "Could not reach CovidTracking API." });
            });
    }
}

module.exports = CovidData;
