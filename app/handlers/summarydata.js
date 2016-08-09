exports.netProfit = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _prevYear = parseInt(_year);
  var _prevMonth = parseInt(_month) - 1;

  if (_prevMonth == 0) {
    _prevMonth = 12;
    _prevYear = _prevYear - 1;
  }

  var _result = {
    month: _month,
    year: _year,
    netProfit: 0,
    prevNetProfit: 0,
    rkap: 0,
    prevRkap: 0
  }

  var _query = "SELECT * FROM laba_bersih WHERE tahun=? and bulan=?";

  db.query(
    _query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      if (rows.length > 0) {
        var _row = rows[0];
        _result.month = _row.bulan;
        _result.year = _row.tahun;
        _result.netProfit = _row.laba_bersih;
        _result.rkap = _row.rkap;
      }

      var _query = "SELECT * FROM laba_bersih WHERE tahun=? and bulan=?";

      db.query(
        _query, [_prevYear, _prevMonth],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _result.prevNetProfit = _row.laba_bersih;
            _result.prevRkap = _row.rkap;
          }

          res.json(_result);

        }
      );

    }
  );
};

exports.projectInfo = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _prevYear = parseInt(_year);
  var _prevMonth = parseInt(_month) - 1;

  if (_prevMonth == 0) {
    _prevMonth = 12;
    _prevYear = _prevYear - 1;
  }

  var _result = {
    month: _month,
    year: _year,
    projectCount: 0,
    lateProjectCount: 0,
    prevLateProjectCount: 0
  }

  var query = "SELECT * FROM progress WHERE tahun=? and bulan=?";
  var _projectCount = 0;
  var _lateProjectCount = 0;
  var _prevLateProjectCount = 0;

  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      _projectCount = rows.length;

      for (var _i in rows) {
        var _row = rows[_i];
        if (parseFloat(_row.progress_ra) > parseFloat(_row.progress_ri)) {
          _lateProjectCount++;
        }
      }

      if (rows.length > 0) {
        _result.month = _month;
        _result.year = _year;
        _result.projectCount = _projectCount;
        _result.lateProjectCount = _lateProjectCount;
      }

      db.query(
        query, [_prevYear, _prevMonth],
        function(err, rows) {
          if (err) throw err;

          for (var _i in rows) {
            var _row = rows[_i];
            if (parseFloat(_row.progress_ra) > parseFloat(_row.progress_ri)) {
              _prevLateProjectCount++;
            }
          }

          if (rows.length > 0) {
            _result.prevLateProjectCount = _prevLateProjectCount;
          }

          res.json(_result);

        }
      );

    }
  );
};

exports.scoreCard = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _prevYear = parseInt(_year);
  var _prevMonth = parseInt(_month) - 1;

  if (_prevMonth == 0) {
    _prevMonth = 12;
    _prevYear = _prevYear - 1;
  }

  var _result = {
    month: _month,
    year: _year,
    total: 0,
    prevTotal: 0,
    target: 0
  }

  var query = "SELECT * FROM total_score_card_wg WHERE tahun=? and bulan=?";

  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      if (rows.length > 0) {
        var _row = rows[0];
        _result.month = _month;
        _result.year = _year;
        _result.total = _row.score;

        db.query(
          "SELECT * FROM score_target WHERE parameter = 'SCORE_CARD_WG' ", [],
          function(err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
              var _row = rows[0];
              _result.target = _row.score_target;
            }

            var query = "SELECT * FROM total_score_card_wg WHERE tahun=? and bulan=?";

            db.query(
              query, [_prevYear, _prevMonth],
              function(err, rows) {
                if (err) throw err;

                if (rows.length > 0) {
                  var _row = rows[0];
                  _result.prevTotal = _row.score;
                }

                res.json(_result);

              }
            );

          }
        );
      } else {

        db.query(
          "SELECT * FROM score_target WHERE parameter = 'SCORE_CARD_WG' ", [],
          function(err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
              var _row = rows[0];
              _result.target = _row.score_target;
            }

            var query = "SELECT * FROM total_score_card_wg WHERE tahun=? and bulan=?";

            db.query(
              query, [_prevYear, _prevMonth],
              function(err, rows) {
                if (err) throw err;

                if (rows.length > 0) {
                  var _row = rows[0];
                  _result.prevTotal = _row.score;
                }

                res.json(_result);

              }
            );

          }
        );

      }
    }
  );
};

exports.riskInfo = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _prevYear = parseInt(_year);
  var _prevMonth = parseInt(_month) - 1;

  if (_prevMonth == 0) {
    _prevMonth = 12;
    _prevYear = _prevYear - 1;
  }

  var _result = {
    month: _month,
    year: _year,
    extremeRiskCount: 0,
    prevExtremeRiskCount: 0,
    riskCount: 0
  }

  var query = "SELECT * FROM manajemen_risiko WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      if (rows.length > 0) {
        var _row = rows[0];
        _result.month = _row.bulan;
        _result.year = _row.tahun;
        _result.extremeRiskCount = _row.jumlah_nilai_risiko_ekstrim;
        _result.riskCount = _row.jumlah_nilai_risiko;
      }

      var query = "SELECT * FROM manajemen_risiko WHERE tahun=? and bulan=?";
      db.query(
        query, [_prevYear, _prevMonth],
        function(err, rows) {
          if (err) throw err;

          if (rows.length > 0) {
            var _row = rows[0];
            _result.prevExtremeRiskCount = _row.jumlah_nilai_risiko_ekstrim;
          }
          res.json(_result);
        }
      );
    }
  );
};

var _getMonth = function(month) {
  if (month === '1' || month === '01') {
    return 'Jan'
  } else if (month === '2' || month === '02') {
    return 'Feb'
  } else if (month === '3' || month === '03') {
    return 'Mar'
  } else if (month === '4' || month === '04') {
    return 'Apr'
  } else if (month === '5' || month === '05') {
    return 'Mei'
  } else if (month === '6' || month === '06') {
    return 'Jun'
  } else if (month === '7' || month === '07') {
    return 'Jul'
  } else if (month === '8' || month === '08') {
    return 'Ags'
  } else if (month === '9' || month === '09') {
    return 'Sep'
  } else if (month === '10' || month === '10') {
    return 'Okt'
  } else if (month === '11' || month === '11') {
    return 'Nov'
  } else if (month === '12' || month === '12') {
    return 'Des'
  }
}

exports.salesChartData = function(req, res, db) {

  var _year = req.params.year;
  //    var _month = req.params.month;

  var _divider = 1000000000;

  var query = "SELECT * FROM omzet_kontrak WHERE tahun=?";
  db.query(
    query, [_year],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      for (var _i in rows) {
        var _row = rows[_i];
        _result.push({
          month: _getMonth(_row.bulan),
          plan: _row.rencana != null ? (_row.rencana / _divider) : null,
          actual: _row.realisasi != null ? (_row.realisasi / _divider) : null,
        });
      }

      res.json(_result);

    }
  );
};

exports.financialChartData = function(req, res, db) {

  var _year = req.params.year;
  //    var _month = req.params.month;

  var _divider = 1000000000;

  var query = "SELECT * FROM laporan_keuangan WHERE tahun=?";
  db.query(
    query, [_year],
    function(err, rows) {
      if (err) throw err;

      var _result = [];

      for (var _i in rows) {
        var _row = rows[_i];
        _result.push({
          bulan: _getMonth(_row.bulan),
          penjualanRa: _row.penjualan_ra != null ? (_row.penjualan_ra / _divider) : null,
          penjualanRi: _row.penjualan_ri != null ? (_row.penjualan_ri / _divider) : null,
          piutangUsaha: _row.piutang_usaha != null ? (_row.piutang_usaha / _divider) : null,
          tagihanBruto: _row.tagihan_brutto != null ? (_row.tagihan_brutto / _divider) : null,
        });
      }

      res.json(_result);

    }
  );
};

exports.wgPropertyList = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM property WHERE tahun=? and bulan=?";

  _result = [];

  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      for (var _i in rows) {
        var _row = rows[_i];
        var _wgProperty = {

          unitName: _row.unit,
          unitCountThisMonth: _row.unit_terjual_bulan_ini,
          unitCountUntilThisMonth: _row.unit_terjual_hingga_bulan_ini,
          unitSoldCountThisMonth: _row.penjualan_bulan_ini,
          unitSoldCountUntilThisMonth: _row.penjualan_hingga_bulan_ini,
          totalUnit: _row.total_unit

        }

        _result.push(_wgProperty);

      }

      res.json(_result);

    }
  );
}

exports.smwg = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    qmsl: 0,
    qmslTotalScore: 0,
    sheLevel: 0,
    sheLevelTotalScore: 0,
    limaR: 0,
    limaRTotalScore: 0,
    scoreTarget: {},
    projectCount: {
      qmsl: 0,
      sheLevel: 0,
      limaR: 0,
    }
  }

  var _scoreTarget = {
    qmsl: 0,
    sheLevel: 0,
    limaR: 0,
  }

  db.query("SELECT * FROM score_target WHERE parameter in ('QMSL', 'SHE_LEVEL', '5R') ", [],
    function(err, rows) {
      if (err) throw err;

      for (var _i in rows) {
        var _row = rows[_i];
        if (_row.parameter == 'QMSL') {
          _scoreTarget.qmsl = _row.score_target;
        } else if (_row.parameter == 'SHE_LEVEL') {
          _scoreTarget.sheLevel = _row.score_target;
        } else if (_row.parameter == '5R') {
          _scoreTarget.limaR = _row.score_target;
        }
      }

      var query = "SELECT * FROM smwg WHERE tahun=? and bulan=?";
      db.query(
        query, [_year, _month],
        function(err, rows) {
          if (err) throw err;
          for (var _i in rows) {
            var _row = rows[_i];
            if (_row.parameter_smwg == 'QMSL') {
              if (_row.score >= _scoreTarget.qmsl) {
                _result.qmsl++;
              }
              _result.qmslTotalScore += _row.score
              _result.projectCount.qmsl++;
            } else if (_row.parameter_smwg == 'SHE_LEVEL') {
              if (_row.score >= _scoreTarget.sheLevel) {
                _result.sheLevel++;
              }
              _result.sheLevelTotalScore += _row.score
              _result.projectCount.sheLevel++;
            } else if (_row.parameter_smwg == '5R') {
              if (_row.score >= _scoreTarget.limaR) {
                _result.limaR++;
              }
              _result.limaRTotalScore += _row.score
              _result.projectCount.limaR++;
            }
          }

          _result.scoreTarget = _scoreTarget;

          res.json(_result);

        }
      );

    }
  );
}

exports.dataProgress = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_data_progress WHERE tahun=? and bulan=?";
  db.query(
    query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      var _result = {
        data_progress: 0
      };

      if (rows.length > 0) {
        var _row = rows[0];
        _result.data_progress = _row.data_progress;
      }

      res.json(_result);

    }
  );
};
