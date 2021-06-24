const Pool = require('pg').Pool

const db = new Pool({
    user: 'postgres',
    password: 'migr@8t',
    host: 'localhost',
    port: 5433,
    database: 'jwtauth'
})

module.exports = db;