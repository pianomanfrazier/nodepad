var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {

  // Passport session setup
  // required for persistant login
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
     done(err, user); 
    });
  });

  // Local Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'password',
    passReqToCallback : true
  },
  function( req, name, password, done) {
    process.nextTick(function() {
      User.findOne( { 'local.name' : name }, function(err, user) {
        if (err) {
          return done(err);  
        }

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That name is taken' ));
        } else {
          var newUser = new User();
          newUser.local.name = name;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err){
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  // local login
  passport.use('local-login' , new LocalStrategy( {
    usernameField : 'name',
    password : 'password',
    passReqToCallback : true
    },
    function(req, name, password, done ) {
      User.findOne({ 'local.name' : name }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
        }
        return done(null, user);
      });
    }));
};

