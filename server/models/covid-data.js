const request = require('request-promise');

/*require('dotenv').config();*/

class CovidData {
  static retrieveByState (state, callback) {
    request({
      uri: `https://covidtracking.com/api/v1/states/${state}/current.json`,
      json: true
    }).then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
      callback({ error: 'Could not reach CovidTracking API.' });
    });
  }

  static retrieveNational (callback) {
    request({
      uri: `https://covidtracking.com/api/v1/us/current.json`,
      json: true
    }).then((res) => {
      callback(res);
    }).catch((err) => {
      console.log(err);
      callback({ error: 'Could not reach CovidTracking API.' });
    });
  }
}

module.exports = CovidData;