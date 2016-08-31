'use strict';

function changeUrl (db) {
    var urls = db.collection('urls');
    var host = process.env.APP_URL;
    
    this.makeUrl = function(req, res) {
        var url = String(req.url.slice(5));
        if (validUrl(url)) {
            urls.count({}, function(err, result) {
                if (err) throw err;
                
                urls.save({'orig_url' : url, 'count' : result + 1}, function(err) {
                    if (err) throw new Error('could not save url');
                    var temp = result + 1;
                    res.json({'orig_url' : url, 'lil_url' : host + temp});
                });
            });
        } else {
            res.json({'error: ' : 'that is not a valid url =('});
        }
    };
    
    this.goToUrl = function(ct, res) {
        urls.find({'count' : ct}).limit(1).toArray(function(err, doc) {
            if (err) throw new Error('could not find url');
            var orig = doc[0].orig_url;
            if (doc) {
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