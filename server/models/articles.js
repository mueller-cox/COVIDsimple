const db = require('../database');

class Articles {
  static retrieveAll (callback) {
    let text = 'SELECT * FROM articles';
    db.query(text, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (article, callback) {
    let text = 'INSERT INTO articles (url, name, source, date, rating_sum, rating_count) VALUES ($1, $2, $3, $4, $5, $6)';
    let name = article.name;
    let url = article.url;
    let source = article.source;
    let date = article.date;
    let rating = article.rating;
    let count = 1;
    db.query(text, [name, url, source, date, rating, count], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (article, callback) {
    let text = `UPDATE articles SET rating_sum = rating_sum + $2, rating_count = rating_count+1 WHERE url=$1`;
    let url = article.url;
    let rating = article.rating;
    db.query(text, [url, rating], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Articles;