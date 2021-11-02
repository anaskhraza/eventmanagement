const promise = require('bluebird'); // or any other Promise/A+ compatible library;
const monitor = require('pg-monitor');
const config = require('../config');
const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(initOptions);
monitor.attach(initOptions);
////console.log("database-configuration", config);
const cn = {
    host: config.HOST, // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: config.DATABASE,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD
};
////console.log("heredb1");
const db = pgp(cn); // database instance;

module.exports = db;