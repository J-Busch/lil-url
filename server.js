'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;
    
var app = express();

mongo.connect('mongodb://localhost:27017/lil-url', function (err, db) {
    if (err) throw new Error('Failed To Connect');
    else {
        console.log('MongoDB connected on port 27017.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
    
    routes(app, db);
    
    app.listen(8080, function () {
        console.log('Listening on port 8080');
    });
});