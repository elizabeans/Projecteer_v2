// require all node modules pulled from dependencies and store them in variables
var express = require('express'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require routes modules defined in routes directory
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// load env variables
dotenv.load();

// view engine setup (not being used)
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Connect to the Mongo database, whether locally or on Mongolab
var local_database_name = 'projecteer';
var local_database_uri = 'mongodb://localhost/' + local_database_name;

// Connects to mongolab server if it exists, otherwise connect to local mongo instance
var database_uri = process.env.MONGODB_CONNECTION_URL || local_database_uri; 

// Check if mongoose connected and if not, throw error
mongoose.connect(database_uri);
var db = module.exports = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log("Connected to server database");
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('express-session')({
    secret: 'JOFEW0932480CNMVWS7SDVJHE321',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 } // session expires in 10 minutes
}));
app.use(cookieParser('JOFEW0932480CNMVWS7SDVJHE321'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'app')));

// use the routes we defined in the routes directory
app.use('/', routes);
//app.use('/users', users);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// All other routes should redirect to the index.html
app.route('/*').get((req, res) => {
    res.sendFile(path.resolve('./public/app/index.html'));
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
