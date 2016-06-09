'use strict';

var ChangeUrl = require(process.cwd() + '/app/controllers/changeUrl.server.js')

module.exports = function(app, db) {
    var change = new ChangeUrl(db);
    
    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });
    
    app.route('/lil/:url').get(function (req, res) {
        var url = req.params.url;
        change.makeUrl(url, res);
    });
    
    app.route('/:count').get(function(req, res) {
        var count = Number(req.params.count);
        change.goToUrl(count, res);
    });
};