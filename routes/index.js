//Dependencies
const path = require('path');
const usersController = require('../../controllers/usersController');
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");

module.exports = function(app, passport, User){

	// Charge Route
	app.post("/charge", async(req,res) => {
		try {
			let {status} = await stripe.charges.create({
				amount: 0000,
				currency: "usd",
				description: "AN EXAMPLE CHARGE",
				source: req.body
			});
	
			res.json({status});
		} catch(err) {
			res.status(500).end();
		}
	});

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
