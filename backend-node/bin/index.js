var express = require('express')
var path = require('path');
var app = express()
require('dotenv').load() 

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Api
var action_view_user = require("../controller/api/user");
var action_view_shop = require("../controller/api/shop");

app.use('/users', action_view_user);
app.use('/shops', action_view_shop);

//Load static file
app.use(express.static('static'));
app.use('/node_modules',  express.static('node_modules'));

module.exports = app;
