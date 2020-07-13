/* Load modules */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database') // (shorthand for requiring index.js)

/* Environment variables */
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000; // use registered port or default to 5000 for server

/* Register middleware */
const app = express(); // init express
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Register API endpoints */
app.use('/api/articles', require('./api/articles'));
app.use('/api/covid-data', require('./api/covid-data'));

/* request handling */
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});

db.query('SELECT NOW()', (err, res) => {
    if(err.error)
        return console.log(err.error);
    console.log(`postgreSQL is connected: ${res[0].now}.`)
});

// export app variable so it can be run on command
module.exports = app;