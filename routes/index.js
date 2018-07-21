//Dependencies
const path = require('path');
const keyPublishable = 'pk_test_xwATFGfvWsyNnp1dDh2MOk8I';
const secret = require('../config/config.js');
const keySecret = secret.SECRET_KEY;
const stripe = require('stripe')(keySecret);

module.exports = function(app, passport, User){

	//Standard Charge Route
	app.post('/charge', (req, res) => {
		//get to dollar amount by *100
		stripe.charges.create({
			amount: req.body.amount * 100,
			source: req.body.source,
			description: 'test charge',
			currency: 'usd',
			receipt_email: req.body.email
		}).then(charge => {
			console.log(charge);
			res.send(charge);
		}).catch(err => 
			res.status(500).send(err)
		);
	
	});

	//Charge and Save User Payment Info Route
	app.post('/charge/create/:id', (req, res) => {
		stripe.customers.create({
			email: req.body.email,
			//source is the token linked to their card
			source: req.body.source
		}).then((customer) => {
			stripe.charges.create({
				amount: req.body.amount * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: req.body.email
			}).then(() => {
				User.findOneAndUpdate({_id: req.params.id}, {
					$set: {customerId : customer.id}
				}, (err, user) => {
					if (err) {
						res.status(422).send(err);
					} 
					else {
						res.send(user);
					}
				});
			}).catch(err => 
				res.status(500).send(err)
			);
		}).catch(err => 
			res.status(500).send(err)
		);
	});


	//Charge a Customer With a Saved Card Route
	app.post('/charge/:id', (req, res) => {
		User.findById({ _id: req.params.id }, (err, user) => {
			if (err) {
				res.status(422).send(err);
			} else if (user) {
				stripe.charges.create({
					amount: req.body.amount * 100,
					customer: user.customerId,
					currency: 'usd',
					receipt_email: user.email
				}).then(charge => 
					res.send(charge)
				).catch(err => 
					res.status(500).send(err)
				);
			} else {
				res.status(422).send({ message: 'DB search error.' });
			}
		});
	});

	//Sign-Up Route
	app.post('/user/signup', (req, res) => {
		const { firstName, lastName, email, password } = req.body;
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				console.log('User signup db search error: ', err);
				res.json(err);
			} else if (user) {
				res.json({
					error: `Sorry, there is already a user with the username: ${email}`
				});
			}
			else {
				const newUser = new User({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password
				});
				newUser.save((err, savedUser) => {
					if (err) return res.json(err);
					res.json(savedUser);
				});
			}
		});
	});

	//Sign-In Route
	app.post('/user/signin', passport.authenticate('local'), (req, res) => {
		let hasCustomerAccount = false;
		if (req.user.customerId) {
			hasCustomerAccount = true;
		}
		const userInfo = {
			id: req.user._id,
			email: req.user.email,
			hasCustomerAccount
		};
		res.send(userInfo);
	});

	//Check to see if signed-in Route
	app.get('/user', (req, res) => {
		if (req.user) {
			User.findById({_id: req.user._id}, (err, data) => {
				if (err) {
					res.json(err);
				} else {
					if (data.customerId) {
						res.json({
							user: req.user,
							hasCustomerAccount: true
						});
					} else {
						res.json({
							user: req.user,
							hasCustomerAccount: false
						});
					}
				}
			});
		} else {
			res.json({ user: null });
		}
	});

	//Sign-Out Route
	app.post('/user/signout', (req, res) => {
		if (req.user) {
			req.logout();
			res.send({ message: 'Logging out' });
		} else {
			res.send({ message: 'No user to log out' });
		}
	});

	//React App
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
	});

};
