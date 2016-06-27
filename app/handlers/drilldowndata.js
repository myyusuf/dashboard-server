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
  var _jsonPesananBaruKontrakDihadapi = {};
  var _jsonTotalPenjualan = {};
  var _jsonPenjualanLama = {};
  var _jsonPenjualanBaru = {};

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

  var _getPesananBaruKontrakDihadapi = function(callback){
    var _query = "SELECT * FROM db_mobile_pesanan_baru_kontrak_dihadapi WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonPesananBaruKontrakDihadapi = JSON.parse(_row.data).pesananBaruKontrakDihadapi;
        }

        callback();
      }
    );
  };

  var _getTotalPenjualan = function(callback){
    var _query = "SELECT * FROM db_mobile_total_penjualan WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonTotalPenjualan = JSON.parse(_row.data).totalPenjualan;
        }

        callback();
      }
    );
  };

  var _getPenjualanLama = function(callback){
    var _query = "SELECT * FROM db_mobile_penjualan_lama WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonPenjualanLama = JSON.parse(_row.data).penjualanLama;
        }

        callback();
      }
    );
  };

  var _getPenjualanBaru = function(callback){
    var _query = "SELECT * FROM db_mobile_penjualan_baru WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonPenjualanBaru = JSON.parse(_row.data).penjualanBaru;
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
          _getPesananBaruKontrakDihadapi(callback);
      },
      function (callback) {
          _getTotalPenjualan(callback);
      },
      function (callback) {
          _getPenjualanLama(callback);
      },
      function (callback) {
          _getPenjualanBaru(callback);
      },
      function (callback) {
          _result.jsonData['totalKontrakDihadapi'] = _jsonTotalKontrakDihadapi;
          _result.jsonData['sisaKontrakDihadapi'] = _jsonSisaKontrakDihadapi;
          _result.jsonData['pesananBaruKontrakDihadapi'] = _jsonPesananBaruKontrakDihadapi;
          _result.jsonData['totalPenjualan'] = _jsonTotalPenjualan;
          _result.jsonData['penjualanLama'] = _jsonPenjualanLama;
          _result.jsonData['penjualanBaru'] = _jsonPenjualanBaru;
          res.json(_result);
      }
  ]);
};

exports.projectInfoDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_info_proyek WHERE  tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      for (var _i in rows) {
        var _row = rows[_i];
        _result.push(JSON.parse(_row.data_proyek).infoProyek);
      }

      res.json(_result);

    }
  );
};
