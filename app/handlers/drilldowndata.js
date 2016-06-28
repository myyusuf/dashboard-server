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

  var _jsonTotalLabaKotor = {};
  var _jsonLabaKotorLama = {};
  var _jsonLabaKotorBaru = {};

  var _jsonTotalPphFinal = {};
  var _jsonPphFinalLama = {};
  var _jsonPphFinalBaru = {};

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

//-----

  var _getTotalLabaKotor = function(callback){
    var _query = "SELECT * FROM db_mobile_total_laba_kotor WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonTotalLabaKotor = JSON.parse(_row.data).totalLabaKotor;
        }

        callback();
      }
    );
  };

  var _getLabaKotorLama = function(callback){
    var _query = "SELECT * FROM db_mobile_laba_kotor_lama WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonLabaKotorLama = JSON.parse(_row.data).labaKotorLama;
        }

        callback();
      }
    );
  };

  var _getLabaKotorBaru = function(callback){
    var _query = "SELECT * FROM db_mobile_laba_kotor_baru WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonLabaKotorBaru = JSON.parse(_row.data).labaKotorBaru;
        }

        callback();
      }
    );
  };
//-----
  var _getTotalPphFinal = function(callback){
    var _query = "SELECT * FROM db_mobile_total_pph_final WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonTotalPphFinal = JSON.parse(_row.data).totalPphFinal;
        }

        callback();
      }
    );
  };

  var _getPphFinalLama = function(callback){
    var _query = "SELECT * FROM db_mobile_pph_final_lama WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonPphFinalLama = JSON.parse(_row.data).pphFinalLama;
        }

        callback();
      }
    );
  };

  var _getPphFinalBaru = function(callback){
    var _query = "SELECT * FROM db_mobile_pph_final_baru WHERE tahun=? and bulan=?";

    db.query(
      _query, [_year, _month],
      function(err, rows) {
        if (err) throw err;

        if (rows.length > 0) {
          var _row = rows[0];
          _jsonPphFinalBaru = JSON.parse(_row.data).pphFinalBaru;
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
          _getTotalLabaKotor(callback);
      },
      function (callback) {
          _getLabaKotorLama(callback);
      },
      function (callback) {
          _getLabaKotorBaru(callback);
      },
      function (callback) {
          _getTotalPphFinal(callback);
      },
      function (callback) {
          _getPphFinalLama(callback);
      },
      function (callback) {
          _getPphFinalBaru(callback);
      },
      function (callback) {
          _result.jsonData['totalKontrakDihadapi'] = _jsonTotalKontrakDihadapi;
          _result.jsonData['sisaKontrakDihadapi'] = _jsonSisaKontrakDihadapi;
          _result.jsonData['pesananBaruKontrakDihadapi'] = _jsonPesananBaruKontrakDihadapi;

          _result.jsonData['totalPenjualan'] = _jsonTotalPenjualan;
          _result.jsonData['penjualanLama'] = _jsonPenjualanLama;
          _result.jsonData['penjualanBaru'] = _jsonPenjualanBaru;

          _result.jsonData['totalLabaKotor'] = _jsonTotalLabaKotor;
          _result.jsonData['labaKotorLama'] = _jsonLabaKotorLama;
          _result.jsonData['labaKotorBaru'] = _jsonLabaKotorBaru;

          _result.jsonData['totalPphFinal'] = _jsonTotalPphFinal;
          _result.jsonData['pphFinalLama'] = _jsonPphFinalLama;
          _result.jsonData['pphFinalBaru'] = _jsonPphFinalBaru;
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
