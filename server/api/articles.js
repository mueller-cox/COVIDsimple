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

router.post('/', (req, res) => {
  var article = req.body.article;

  Articles.insert(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;