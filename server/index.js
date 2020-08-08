/* Load modules */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/* Add variables from .env file to environment */
const dotenv = require("dotenv").config();

// load db Object
let db = require("./database"); // (shorthand for requiring database/index.js)

/* Environment variables */
const ENV = process.env.NODE_ENV;
// use registered port or default to 5000 for server
const PORT = process.env.PORT || 5000;

/* Register middleware */
const app = express(); // init express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable CORS on all requests from origin localhost:3000
// may need to change to a function allowing multiple origins on deployment:
//  Ref: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

/* Register API endpoints */
app.use("/api/articles", require("./api/articles"));
app.use("/api/covid-data", require("./api/covid-data"));
app.use("/api/news", require("./api/news"));

/* Setup listening on PORT for request handling*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

/* log successful DB connection */
db.query("SELECT NOW()", (err, res) => {
    if (err.error) console.error(err.error);
    console.log(`postgreSQL is connected: ${res[0].now}.`);
});

/* Close server on Ctrl-C or uncaught exception */
process.on("SIGINT", () => {
    console.log("Closing server...");
    process.exit(0);
});
process.on("uncaughtException", (e) => {
    console.error(e);
    console.error(e.stack);
    process.exit(99);
});

// export app variable so it can be run on command
module.exports = app;
