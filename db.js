var Db = require('mongodb').Db
var Server = require('mongodb').Server
var db = new Db('slack', new Server('localhost', 27017));

module.exports = db;
