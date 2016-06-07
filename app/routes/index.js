'use strict';

var ChangeUrl = require(process.cwd() + '/app/controllers/changeUrl.server.js')

module.exports = function(app, db) {
    var change = new ChangeUrl(db);
    
    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });
    app.route('/lil').get(function (req, res) {
        change.say(req, res);
    });
};