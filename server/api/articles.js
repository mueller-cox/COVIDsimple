var express = require('express');
var Articles = require('../models/articles');

var router = express.Router();

/* returns all article records */
router.get('/', (req, res) => {
  Articles.retrieveAll((err, articles) => {
    if (err)
      return res.json(err);
    return res.json(articles);
    
  });
});

/* adds an article if it does not already exist, url is the PRIMARY KEY, otherwise update */
router.post('/add', (req, res) => {
  let article = req.body;
  Articles.insert(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/* updates the rating of an article if it is in the database */
router.post('/update', (req, res) => {
  let article = req.body;
  Articles.update(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/* updates the rating of an article if it is in the database */
router.post('/delete', (req, res) => {
  let article = req.body;
  Articles.deleteArticle(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


module.exports = router;