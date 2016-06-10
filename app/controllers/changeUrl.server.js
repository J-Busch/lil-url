'use strict';

function changeUrl (db) {
    var urls = db.collection('urls');
    var host = process.env.APP_URL;
    var count = 0;
    
    this.makeUrl = function(url, res) {
        count++;
        if (validUrl(url)) {
            urls.save({'orig_url' : url, 'count' : count}, function(err, data) {
                if (err) throw new Error('could not save url');
                res.json({'orig_url' : url, 'lil_url' : host + count});
            });
        } else {
            res.json({'error: ' : 'that is not a valid url =('});
        }
    };
    
    this.goToUrl = function(ct, res) {
        urls.find({'count' : ct}).limit(1).toArray(function(err, doc) {
            if (err) throw new Error('could not find url');
            var orig = doc[0].orig_url;
            if (doc.length > 0) {
                res.redirect(orig);
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