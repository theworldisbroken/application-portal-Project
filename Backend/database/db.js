const mongoose = require("mongoose");
const config = require("config");

let _db;

const connectionString = config.db.connectionString;

function initDb(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db);
        } else {
            return _db;
        }
    } else {
        console.log("database connection " + connectionString);
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        _db = mongoose.connection;
        _db.on('error', console.error.bind(console, 'connection error:'));
        _db.once('open', function () {
            console.log("connected to database " + connectionString);
            callback(null, _db);
        });
    }
}

function getDb() {
    return _db;
}

module.exports = {
    getDb,
    initDb
}
