module.exports = function(passport) {
  var router = require('express').Router();

  router.get('/', function(req, res) {
    res.render('index.pug');
  });

  router.get('/login', function(req, res) {
    res.render('login.pug', { message : req.flash('loginMessage') });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.get('/signup', function(req, res) {
     res.render('signup.pug', { message: req.flash('signupMessage') });
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }) )
  
  // protected with passport isLoggedIn
  // pull user from the session
  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
      user : req.user
    }) 
  });

  router.get('/logout',  function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}; 

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
