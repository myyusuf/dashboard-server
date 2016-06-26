var flow = require('nimble');

exports.kontrakDihadapi = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _prevYear = parseInt(_year);
  var _prevMonth = parseInt(_month) - 1;

  if (_prevMonth == 0) {
    _prevMonth = 12;
    _prevYear = _prevYear - 1;
  }

  var _jsonTotalKontrakDihadapi = {};
  var _jsonSisaKontrakDihadapi = {};

  var _result = {
    month: _month,
    year: _year,
    jsonData: {}
  }

  var _getTotalKontrakDihadapi = function(callback){
    var _query = "SELECT * FROM db_mobile_total_kontrak_dihadapi WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonTotalKontrakDihadapi = JSON.parse(_row.data).totalKontrakDihadapi;
        }

        callback();
      }
    );
  };

  var _getSisaKontrakDihadapi = function(callback){
    var _query = "SELECT * FROM db_mobile_sisa_kontrak_dihadapi WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonSisaKontrakDihadapi = JSON.parse(_row.data).sisaKontrakDihadapi;
        }

        callback();
      }
    );
  };

  flow.series([
      function (callback) {
          _getTotalKontrakDihadapi(callback);
      },
      function (callback) {
          _getSisaKontrakDihadapi(callback);
      },
      function (callback) {
          _result.jsonData['totalKontrakDihadapi'] = _jsonTotalKontrakDihadapi;
          _result.jsonData['sisaKontrakDihadapi'] = _jsonSisaKontrakDihadapi;
          res.json(_result);
      }
  ]);


};
