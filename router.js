'use strict';

const _ = require('lodash');
const fs = require('fs');
const bodyParser = require('body-parser'); // form data parsing - npm install body-parser

//-----------------------------------------------------------------------------
// Authorisation constants
//-----------------------------------------------------------------------------
const AUTH_CONFIG = require('./config/auth.json');
const AUTH_HOST = _.get(AUTH_CONFIG, 'host', 'localhost');
const AUTH_PORT = _.get(AUTH_CONFIG, 'port', 3000);
const PRODUCT_ID = _.get(AUTH_CONFIG, 'productId', 'product_id');
const DEVICE_SERIAL_NUMBER = _.get(AUTH_CONFIG, 'deviceSerialNumber', 0);

const DEVICE_SECRET = _.get(require('./config/deviceSecret.json'), 'deviceSecret');

const CONFIG = require('./config/config.json');

//-----------------------------------------------------------------------------
// HTTP Server details
//-----------------------------------------------------------------------------
var express = require("express");
var app = express();

var server = require('http').createServer(app);

var port = _.get(CONFIG, 'port', 8081); // _.get(process.ENV_PORT || CONFIG, 'port', 8081);     

//-----------------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------------
var process = require('./process/main');

app.use(bodyParser.json());

// Routers
app.post('/', function(request, response) {
    
    process.main(request, response);
});

app.get('/', function(req, res) {
    res.send('index');
});

app.get('/test', function(req, res) {
    process.somethingElse(req, res);
});

// Port listener
//server.on('request', app);
server.listen(port, function() { //server.listen(port, process.ENV_IP, function() {
    console.log('HTTP listening on: ' + server.address().address + '/' + server.address().port);
});
