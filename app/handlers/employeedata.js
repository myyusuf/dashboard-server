exports.birthdayData = function(req, res, db) {

  // var _year = req.params.year;
  var _month = req.params.month;

  var query = "SELECT * FROM db_mobile_ulang_tahun WHERE bulan = ? ";
  db.query(
    query, [_month],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};
