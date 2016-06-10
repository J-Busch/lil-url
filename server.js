'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;
    
var app = express();
var url = process.env.MONGO_URI;

mongo.connect(url, function (err, db) {
    if (err) throw new Error('failed to connect');
    else {
        console.log('MongoDB connected.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
    
    routes(app, db);
    
    app.listen(8080, function () {
        console.log('Listening on port 8080');
    });
});