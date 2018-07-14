//Dependencies
const path = require('path');
const usersController = require('../controllers/usersController');
const keyPublishable = 'pk_test_xwATFGfvWsyNnp1dDh2MOk8I';
const keySecret = 'sk_test_AKVA7CFMVqdEG0ZnhF7uiLz7';
const stripe = require("stripe")(keySecret)
module.exports = function(app, passport, User){

	// Charge Route
	app.post("/charge", (req,res) => {
		console.log(req.body)
		let amount = 50

		stripe.charges.create({
			amount,
			source: req.body.source,
			description: 'test charge',
			currency: 'usd',
		}).then(charge => res.send(charge))
		
	})

	//Sign-Up Route
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	//Sign-In Route
	app.post('/signin', passport.authenticate('local-signin', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true 
	}));

	//Sign-Out Route
	app.post('/logout', function(req, res){
		req.session.destroy(function(err){
			res.redirect('/');
		});
	});

	//React App
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});

};
