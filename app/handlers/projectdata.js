var fs = require('fs-extra');
var wgconstant = require('../../config/wgconstant.js');

var path = require('path');

exports.viewImage = function (req, res) {

    var _projectCode = req.params.projectCode;
    var _imageCode = req.params.imageCode;


    var _directory = wgconstant.PROJECT_IMAGE_DIRECTORY_PATH;
    var _fileName = _imageCode + '.png';
    var _filePath = _directory + _projectCode + '/' + _fileName;

    fs.readFile(_filePath, function (err, content) {
        if (err) {
            res.writeHead(400, {
                'Content-type': 'image/jpeg'
            })
            console.log(err);
            res.end("No file found.");
        } else {
            res.end(content);
        }
    });

};
