const db = require('../database');

class Articles {
  static retrieveAll (callback) {
    db.query('SELECT name FROM articles', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (article, callback) {
    db.query('INSERT INTO articles (name) VALUES ($1)', [article], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Articles;