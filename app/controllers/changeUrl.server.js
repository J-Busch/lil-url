'use strict';

function changeUrl (db) {
    var urls = db.collection('urls');
    var host = process.env.APP_URL;
    
    this.makeUrl = function(req, res) {
        var url = String(req.url.slice(5));
        if (validUrl(url)) {
            urls.find({}, {count : true, _id : false}).sort({count : -1}).limit(1).exec(function(err, result) {
                if (err) throw err;
                
                urls.save({'orig_url' : url, 'count' : result[0].count + 1}, function(err) {
                    if (err) throw new Error('could not save url');
                    res.json({'orig_url' : url, 'lil_url' : host + result[0].count + 1});
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