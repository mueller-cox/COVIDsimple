const db = require('../database');

class Articles {
  static retrieveAll (callback) {
    db.query('SELECT article_name from articles', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (article, callback) {
    db.query('INSERT INTO articles (article_name) VALUES ($1)', [article], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Articles;