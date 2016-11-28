var express  = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var app      = express();
var port     = process.env.PORT || 3000;

var configDB = require('./config/database');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.set('port', port);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, './public')));

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'pug'); // set up pug for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var routes = require('./app/routes/routes')(passport); // load our routes and pass in our app and fully configured passport
var api = require('./app/routes/api')(passport);
app.use('/', routes);
app.use('/', api);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
