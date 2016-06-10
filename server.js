'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var url = process.env.MONGOLAB_URI;    
var app = express();

app.set('port', (process.env.PORT || 8080));

mongo.connect(url, function (err, db) {
    if (err) throw new Error('failed to connect');
    else {
        console.log('MongoDB connected.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
    
    routes(app, db);
    
    app.listen(app.get('port'), function () {
        console.log('Listening on port 8080');
    });
});