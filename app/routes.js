var summaryData = require('./handlers/summarydata.js');
var summaryPdf = require('./handlers/summarypdf.js');

module.exports = function(app, passport, db) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================


  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.handlebars', {
      layout: '',
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    // successRedirect : '/profile', // redirect to the secure profile section
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.handlebars', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.handlebars', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    // res.redirect('/');
    res.redirect('/login');
  });

  app.get('/', isLoggedIn, function(req, res) {
    res.render('dashboard.handlebars', {
      currentPageView: 'dashboard',
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // Summary Data ========================
  // =====================================
  app.get('/summarydata/net-profit/:year/:month', function(req, res) {
    summaryData.netProfit(req, res, db);
  });

  app.get('/summarydata/project-info/:year/:month', function(req, res) {
    summaryData.projectInfo(req, res, db);
  });

  app.get('/summarydata/score-card/:year/:month', function(req, res) {
    summaryData.scoreCard(req, res, db);
  });

  app.get('/summarydata/risk-info/:year/:month', function(req, res) {
    summaryData.riskInfo(req, res, db);
  });

  app.get('/summarydata/financial/:year', function(req, res) {
    summaryData.financialChartData(req, res, db);
  });

  app.get('/summarydata/sales/:year', function(req, res) {
    summaryData.salesChartData(req, res, db);
  });

  app.get('/summarydata/wg-property-list/:year/:month', function(req, res) {
    summaryData.wgPropertyList(req, res, db);
  });

  app.get('/summarydata/smwg/:year/:month', function(req, res) {
    summaryData.smwg(req, res, db);
  });

  app.get('/showpdf/:fileName/:year/:month/:dummy', function(req, res) {
    summaryPdf.downloadPdf(req, res, db);
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  // res.redirect('/');
  res.redirect('/login');
}
