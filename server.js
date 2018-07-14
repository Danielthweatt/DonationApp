//Dependecies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models').User;
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
require('./config/passport/passport.js')(passport, User);

// Configure Routes (to do: make routes a export a function that returns a router)
require('./routes')(app, passport, User);



// Use routes (once router is exported (see above))
//app.use(routes);

// Connection to MongoDB
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/donation_app');

// API server Start
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});
