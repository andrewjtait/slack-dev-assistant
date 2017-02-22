var express = require('express')
var bodyParser = require('body-parser')

var server = express()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

module.exports = server
