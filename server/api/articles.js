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
  let input_url = req.body.url;
  let input_name = req.body.name;
  let input_source = req.body.source;
  let input_date = req.body.date;
  let input_rating = req.body.rating

  if(!input_url.match((/https?:\/\/[^\s]+/))){
    return res.status(400).json({error: "Invalid URL"});
  }
  if(input_rating < 1 || input_rating > 5){
    return res.status(400).json({error: "Rating out of range"});
  }
  if(input_name.length < 2){
    return res.status(400).json({error: "Invalid article name"});
  }
  if(input_source.length < 2){
    return res.status(400).json({error: "Invalid article source"});
  }
  let article ={
    url: input_url,
    name: input_name,
    source: input_source,
    date: input_date,
    rating: input_rating
  }
  Articles.insert(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/* updates the rating of an article if it is in the database */
router.post('/update', (req, res) => {
  let input_url = req.body.url;
  let input_rating = req.body.rating

  if(!input_url.match((/https?:\/\/[^\s]+/))){
    return res.status(400).json({error: "Invalid URL"});
  }
  if(input_rating < 1 || input_rating > 5){
    return res.status(400).json({error: "Rating out of range"});
  }

  let article = {
    url: input_url,
    rating: input_rating,
  }

  Articles.update(article, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/* deletes article if in the database */
router.post('/delete', (req, res) => {
  let url = req.body.url;
  Articles.deleteArticle(url, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

/* returns true if in db or false */
/* TODO this is not working as desired do not use yet */
router.post('/exists', (req, res) => {
  let url = req.body.url;
  Articles.exists(url, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


module.exports = router;