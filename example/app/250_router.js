var routes = require('routes');
var fs = require('fs');
var path = require('path');
var trumpet = require('trumpet');



module.exports = function (db) {
    var r = routes();
    r.addRoute('/', function (req, res, params) {
        var tr = trumpet();
        var msgs = db.createReadStream({ start: 'msg!', end: 'msg!\uffff' });
        
        readStream('index.html').pipe(tr).pipe(res);
    });
    return r;
};

function readStream (file) {
    return fs.createReadStream(path.join(__dirname, 'static', file));
}
