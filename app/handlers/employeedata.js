exports.birthdayData = function(req, res, db) {

  // var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_ulang_tahun WHERE bulan = ? ORDER BY tanggal ";
  db.query(
    query, [_month],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};

exports.birthdayDataCount = function(req, res, db){

  var _month = req.params.month;

  var query = "SELECT count(1) as totalRecords FROM db_mobile_ulang_tahun WHERE bulan = ? ";
  db.query(
    query, [_month],
    function(err, rows) {
      if (err) throw err;
      var totalRecords = rows[0].totalRecords;
      res.json({totalRecords: totalRecords});
    }
  );
};
