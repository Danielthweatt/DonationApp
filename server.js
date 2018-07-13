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
<<<<<<< HEAD
const stripe = require("stripe")("sk_test_AKVA7CFMVqdEG0ZnhF7uiLz7");
=======
>>>>>>> e17f93ca0acf0c040f3e49ef500862dc73a6ba6d
const PORT = process.env.PORT || 3001;

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
require('./config/passport/passport.js')(passport, User);

// Configure Routes (to do: make routes a export a function that returns a router)
require('./routes')(app, passport, User);

// Use routes (once router is exported (see above))
// app.use(routes);

<<<<<<< HEAD
app.post("/charge", async(req,res) => {
	//console.log(req.body)
	try {
		let {status} = await stripe.charges.create({
			//in cents
			amount: 50,
			currency: "usd",
			description: "AN EXAMPLE CHARGE",
			source: req.body
		});
		res.json({status});
	} catch(err) {
		res.status(500).end();
	}
})
=======
>>>>>>> e17f93ca0acf0c040f3e49ef500862dc73a6ba6d

// Connection to MongoDB
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/donation_app');

// API server Start
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});
