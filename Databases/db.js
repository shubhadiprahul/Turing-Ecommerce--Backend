const env = require('dotenv').config()

const knex = require('knex')({
    client : 'mysql',
    connection: {
        host: process.env.DB_HOST,//"localhost"
        user: process.env.DB_USER,//"root"
        password: process.env.DB_PASS,//"1234"
        database: process.env.DB_NAME//praveen
      },
});

module.exports = knex;