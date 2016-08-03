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

  var _jsonTotalLabaKotorStlhPphFinal = {};
  var _jsonLabaKotorStlhPphFinalLama = {};
  var _jsonLabaKotorStlhPphFinalBaru = {};
  var _jsonEfisiensiLabaKotorStlhPphFinal = {};

  var _jsonBiayaUsaha= {};

  var _jsonLabaUsaha= {};
  var _jsonLabaUsahaLspLabaRugiLain= {};
  var _jsonLabaSebelumPajak= {};

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

  //-----
    var _getTotalLabaKotorStlhPphFinal = function(callback){
      var _query = "SELECT * FROM db_mobile_total_laba_kotor_stlh_pph_final WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonTotalLabaKotorStlhPphFinal = JSON.parse(_row.data).totalLabaKotorStlhPphFinal;
          }

          callback();
        }
      );
    };

    var _getLabaKotorStlhPphFinalLama = function(callback){
      var _query = "SELECT * FROM db_mobile_laba_kotor_stlh_pph_final_lama WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonLabaKotorStlhPphFinalLama = JSON.parse(_row.data).labaKotorStlhPphFinalLama;
          }

          callback();
        }
      );
    };

    var _getLabaKotorStlhPphFinalBaru = function(callback){
      var _query = "SELECT * FROM db_mobile_laba_kotor_stlh_pph_final_baru WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonLabaKotorStlhPphFinalBaru = JSON.parse(_row.data).labaKotorStlhPphFinalBaru;
          }

          callback();
        }
      );
    };

    var _getEfisiensiLabaKotorStlhPphFinal = function(callback){
      var _query = "SELECT * FROM db_mobile_efisiensi_laba_kotor_stlh_pph_final WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonEfisiensiLabaKotorStlhPphFinal = JSON.parse(_row.data).efisiensiInefisiensilabaKotorStlhPphFinal;
          }

          callback();
        }
      );
    };
//----------
    var _getBiayaUsaha = function(callback){
      var _query = "SELECT * FROM db_mobile_biaya_usaha WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonBiayaUsaha = JSON.parse(_row.data).biayaUsaha;
          }

          callback();
        }
      );
    };
//---------
    var _getLabaUsaha = function(callback){
      var _query = "SELECT * FROM db_mobile_laba_usaha WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonLabaUsaha = JSON.parse(_row.data).labaUsaha;
          }

          callback();
        }
      );
    };

    var _getLabaUsahaLspLabaRugiLain = function(callback){
      var _query = "SELECT * FROM db_mobile_laba_usaha_lsp_laba_rugi_lain WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonLabaUsahaLspLabaRugiLain = JSON.parse(_row.data).labaUsahaLspLabaRugiLain;
          }

          callback();
        }
      );
    };

    var _getLabaSebelumPajak = function(callback){
      var _query = "SELECT * FROM db_mobile_laba_sebelum_pajak WHERE tahun=? and bulan=?";

      db.query(
        _query, [_year, _month],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _jsonLabaSebelumPajak = JSON.parse(_row.data).labaSebelumPajak;
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
          _getTotalLabaKotorStlhPphFinal(callback);
      },
      function (callback) {
          _getLabaKotorStlhPphFinalLama(callback);
      },
      function (callback) {
          _getLabaKotorStlhPphFinalBaru(callback);
      },
      function (callback) {
          _getEfisiensiLabaKotorStlhPphFinal(callback);
      },

      function (callback) {
          _getBiayaUsaha(callback);
      },

      function (callback) {
          _getLabaUsaha(callback);
      },
      function (callback) {
          _getLabaUsahaLspLabaRugiLain(callback);
      },
      function (callback) {
          _getLabaSebelumPajak(callback);
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

          _result.jsonData['totalLabaKotorStlhPphFinal'] = _jsonTotalLabaKotorStlhPphFinal;
          _result.jsonData['labaKotorStlhPphFinalLama'] = _jsonLabaKotorStlhPphFinalLama;
          _result.jsonData['labaKotorStlhPphFinalBaru'] = _jsonLabaKotorStlhPphFinalBaru;
          _result.jsonData['efisiensiInefisiensilabaKotorStlhPphFinal'] = _jsonEfisiensiLabaKotorStlhPphFinal;

          _result.jsonData['biayaUsaha'] = _jsonBiayaUsaha;

          _result.jsonData['labaUsaha'] = _jsonLabaUsaha;
          _result.jsonData['labaUsahaLspLabaRugiLain'] = _jsonLabaUsahaLspLabaRugiLain;
          _result.jsonData['labaSebelumPajak'] = _jsonLabaSebelumPajak;
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

exports.projectInfoDDDetails = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_info_proyek WHERE id_proyek=? and tahun=? and bulan=?";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data_proyek).infoProyek;
      }

      res.json(_result);

    }
  );
};

exports.qmslDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_qmsl WHERE  tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).qmsl;
      }

      res.json(_result);

    }
  );
};

exports.sheLevelDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_she_level WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).sheLevel;
      }

      res.json(_result);

    }
  );
};

exports.limaRDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_lima_r WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).limaR;
      }

      res.json(_result);

    }
  );
};

exports.scoreCardDD = function(req, res, db) {

  var _projectId = req.params.projectId;
  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_score_card WHERE id_proyek=? and tahun=? and bulan=?";
  db.query(
    query, [_projectId, _year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).scoreCard;

        if("WGPUS001" === _projectId){
          if(_month == 12){
            _month = 1
            _year = _year - 1
          }else{
            _month = _month - 1;
          }

          //------------------------------
          var query = "SELECT * FROM db_mobile_score_card WHERE id_proyek=? and tahun=? and bulan=?";
          db.query(
            query, [_projectId, _year, _month],
            function(err, rows) {
              if (err) throw err;

              var _prevScoreCard = {};

              if (rows.length > 0) {
                var _row = rows[0];
                _prevScoreCard = JSON.parse(_row.data).scoreCard;
                _result.kinerjaProdukProses.inovasi.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.inovasi.score.ri;
                _result.kinerjaProdukProses.qsheExcel.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.qsheExcel.score.ri;
                _result.kinerjaProdukProses.competitiveIndex.score['prevRi'] = _prevScoreCard.kinerjaProdukProses.competitiveIndex.score.ri;

                _result.kinerjaFokusPelanggan.csi.score['prevRi'] = _prevScoreCard.kinerjaFokusPelanggan.csi.score.ri;

                _result.kinerjaKeuanganPasar.netProfit.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.netProfit.score.ri;
                _result.kinerjaKeuanganPasar.arusKasOperasi.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.arusKasOperasi.score.ri;
                _result.kinerjaKeuanganPasar.okBaru.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.okBaru.score.ri;
                _result.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score['prevRi'] = _prevScoreCard.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score.ri;

                _result.kinerjaFokusTenagaKerja.hcEngagementLevel.score['prevRi'] = _prevScoreCard.kinerjaFokusTenagaKerja.hcEngagementLevel.score.ri;

                _result.kinerjaKepemimpinanTataKelola.gcgLevel.score['prevRi'] = _prevScoreCard.kinerjaKepemimpinanTataKelola.gcgLevel.score.ri;
                _result.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score['prevRi'] = _prevScoreCard.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score.ri;
              }else{
                _result.kinerjaProdukProses.inovasi.score['prevRi'] = 0;
                _result.kinerjaProdukProses.qsheExcel.score['prevRi'] = 0
                _result.kinerjaProdukProses.competitiveIndex.score['prevRi'] = 0;

                _result.kinerjaFokusPelanggan.csi.score['prevRi'] = 0;

                _result.kinerjaKeuanganPasar.netProfit.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.arusKasOperasi.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.okBaru.score['prevRi'] = 0;
                _result.kinerjaKeuanganPasar.penjualanThdKontrakDihadapi.score['prevRi'] = 0;

                _result.kinerjaFokusTenagaKerja.hcEngagementLevel.score['prevRi'] = 0;

                _result.kinerjaKepemimpinanTataKelola.gcgLevel.score['prevRi'] = 0;
                _result.kinerjaKepemimpinanTataKelola.riskMaturityLevel.score['prevRi'] = 0;
              }

              res.json(_result);

            }
          );
          //------------------------------

        }else{
          res.json(_result);
        }
      }else{
        res.json(_result);
      }

    }
  );
};

exports.propertyDD = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_ok_op_lk_property WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {};

      if (rows.length > 0) {
        var _row = rows[0];
        _result = JSON.parse(_row.data).okOpLkProperty;
      }

      res.json(_result);

    }
  );
};
