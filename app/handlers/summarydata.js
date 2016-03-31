exports.netProfit = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: _month,
    year: _year,
    netProfit: 0,
    rkap: 0
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

      res.json(_result);

    }
  );
};

exports.projectInfo = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: _month,
    year: _year,
    projectCount: 0,
    lateProjectCount: 0
  }

  var query = "SELECT * FROM progress WHERE tahun=? and bulan=?";
  var _projectCount = 0;
  var _lateProjectCount = 0;

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

      res.json(_result);

    }
  );
};

exports.scoreCard = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: _month,
    year: _year,
    total: 0,
    target: 0
  }

  var query = "SELECT * FROM total_score_card_wg WHERE tahun=? and bulan=?";
  var _target = 0;
  var _total = 0;

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
            res.json(_result);
          }
        );
      }else{
        res.json(_result);
      }
    }
  );
};

exports.riskInfo = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: _month,
    year: _year,
    extremeRiskCount: 0,
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
      res.json(_result);
    }
  );
};
