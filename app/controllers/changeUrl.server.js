'use strict';

function changeUrl (db) {
    this.say = function(req, res) {
        res.send("I said something!");
    };
};

module.exports = changeUrl;