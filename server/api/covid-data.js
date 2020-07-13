var express = require('express');
var CovidData = require('../models/covid-data');

var router = express.Router();

/* state data request */
router.get('/:state', (req, res) => {
  var state = req.params.state;

  CovidData.retrieveByState(state, (err, data) => {
    if (err) 
      return res.json(err);
    return res.json(data);
  });
});

/* national data request */
router.get('/', (req, res) => {
  CovidData.retrieveNational((err, data) => {
    if (err) 
      return res.json(err);
    return res.json(data);
  });
});

module.exports = router;