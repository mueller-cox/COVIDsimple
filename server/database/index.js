
var { Pool } = require('pg');

//pg environment variables
const PG_USER= process.env.DB_USER;
const PG_DB= process.env.DB_NAME;
const PG_HOST= process.env.DB_HOST;
const PG_PWD=process.env.DB_PWD;
const PG_PORT=process.env.PG_PORT;

const CONNECTION_STRING = process.env.DATABASE_URL 
                          || `postgresql://${PG_USER}:${PG_PWD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;
const SSL = process.env.NODE_ENV === 'production';

console.log(CONNECTION_STRING);
console.log(SSL);

class Database {
    constructor () {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            
            //ssl: SSL
          });
      
          this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
          });
    }

    query (query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];
      
            client.query(query, params, (err, res) => {
              done();
              if (err) {
                console.log(err.stack);
                return callback({ error: 'Database error.' }, null);
              }
              callback({}, res.rows);
            });
          });
    }

    end () {
        this._pool.end();
    }
}

module.exports = new Database(); // require returns instance of Db class