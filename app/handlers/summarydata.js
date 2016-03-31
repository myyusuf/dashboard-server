var flow = require('nimble');

exports.netProfitList = function(req, res, db) {

  var _year = req.params.year;
  var _month = req.params.month;

  var _result = {
    month: 0,
    year: 0,
    netProfit: 0,
    rkap: 0
  }

  var _query = "SELECT * FROM laba_bersih WHERE tahun=? and bulan=?";

  db.query(
    _query, [_year, _month],
    function(err, rows) {
      if (err) throw err;

      console.log('_year :  ' + _year);
      console.log('_month :  ' + _month);

      if (rows.length > 0) {
        var _row = rows[0];
        _result.month = _row.bulan;
        _result.year = _row.tahun;
        _result.netProfit = _row.laba_bersih;
        _result.rkap = _row.rkap;
      }

      res.json(_result)

    }
  );

};
