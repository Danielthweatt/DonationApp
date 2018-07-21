//Dependecies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models').User;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const app = express();
const PORT = process.env.PORT || 3001;
 
// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
require('./config/passport/passport.js')(passport, User);

// Configure Routes
require('./routes')(app, passport, User);

// Connection to MongoDB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/donation_app');

// API server Start
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});
