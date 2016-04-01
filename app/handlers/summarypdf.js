var fs = require('fs-extra');
var wgconstant = require('../../config/wgconstant.js');

var path = require('path');

exports.downloadPdf = function (req, res) {
    
    var _fileName = req.params.fileName;
    var _year = req.params.year;
    var _month = req.params.month;
    

    var _directory = wgconstant.SUMMARY_DRILLDOWN_DIRECTORY_PATH;
    var _fileName = _fileName + '_' + _month + '.pdf';
    var _filePath = _directory + _year + '/' + _fileName;

    fs.readFile(_filePath, function (err, content) {
        if (err) {
            res.writeHead(400, {
                'Content-type': 'text/html'
            })
            console.log(err);
            res.end("No file found.");
        } else {
            res.end(content);
        }
    });

};