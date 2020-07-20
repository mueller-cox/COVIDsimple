var express = require('express');
var News = require('../models/news');

var router = express.Router();

/* WHO news data request */
router.get('/who', (req, res) => {
  News.retrieveWhoNews((err, data) => {
    if (err) 
      return res.json(err);
    return res.json(data);
  });
});

router.get('/cdc', (req, res) => {
  News.retrieveCdcNews((err, data) => {
    if (err) 
      return res.json(err);
    return res.json(data);
  });
});

module.exports = router;