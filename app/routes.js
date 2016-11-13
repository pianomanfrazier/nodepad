module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  app.get('/login', function(req, res) {
    res.render('login.pug', { message : req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/signup', function(req, res) {
     res.render('signup.pug', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }) )
  
  // protected with passport isLoggedIn
  // pull user from the session
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
      user : req.user
    }) 
  });

  app.get('/logout',  function(req, res) {
    req.logout();
    res.redirect('/');
  });
}; 

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
