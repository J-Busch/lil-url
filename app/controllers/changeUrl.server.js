'use strict';

function changeUrl (db) {
    var urls = db.collection('urls');
    var host = 'https://api-project-spacesquid.c9users.io/';
    var count = 0;
    
    this.makeUrl = function(url, res) {
        count++;
        urls.save({'orig_url' : url, 'count' : count}, function(err, data) {
            if (err) throw err;
            res.json({'orig_url' : url, 'lil_url' : host + count});
        });
    };
    
    this.goToUrl = function(ct, res) {
        urls.find({'count' : ct}).limit(1).toArray(function(err, doc) {
            if (err) throw err;
            var orig = doc[0].orig_url;
            if (doc.length > 0) {
                res.redirect('https://' + orig);
            } else {
                res.json({'error: ' : 'could not find original url =('});
            }
        });
    };
    
    function validUrl(url) {
        var regex = /https?:\/\/www\..+\.com/;
        return url.match(regex);
    }
};



module.exports = changeUrl;