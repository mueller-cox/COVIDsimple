var express = require('express');
var Articles = require('../models/articles');

var router = express.Router();

router.get('/', (req, res) => {
  Articles.retrieveAll((err, articles) => {
    if (err)
      return res.json(err);
    return res.json(articles);
  });
});

router.post('/add', (req, res) => {
  let article = req.body.article;
  Articles.insert(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/update', (req, res) => {
  let article = req.body.article;
  Articles.update(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;