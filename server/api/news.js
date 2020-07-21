var express = require('express');
var News = require('../models/news');

var router = express.Router();

/* news data request should go to /api/news 
returns all articles from who and cdc rss feeds in sorted order from most recent
to least recent */
router.get('/', (req, res) => {
  News.retrieveNews((err, data) => {
    if (err) 
      return res.json(err);
    return res.json(data);
  });
});


module.exports = router;