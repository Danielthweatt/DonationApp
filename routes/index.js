//Dependencies
const path = require('path');
const keyPublishable = 'pk_test_xwATFGfvWsyNnp1dDh2MOk8I';

const secret = require('../config/config.js');
const keySecret = secret.SECRET_KEY;
const stripe = require('stripe')(keySecret);

module.exports = function(app, passport, User){

	// Charge Route for no customer creation
	app.post('/charge', (req,res) => {
		console.log(req.body);
		//get to dollar amount by *100
		let amount = (req.body.amount) * 100;
		stripe.charges.create({
			amount,
			source: req.body.source,
			description: 'test charge',
			currency: 'usd',
			receipt_email: req.body.email
		}).then(charge => res.send(charge));
	
	});

	//charge route first time logged in to save info

	app.post('/charge/create/:id', (req,res) => {
		let id = req.params.id;
		let amount = (req.body.amount) * 100;
		//console.log(id)
    
		stripe.customers.create({
			email: req.body.email,
			//source is the token linked to their card
			source: req.body.source

		}).then((customer) => {
			stripe.charges.create({
				amount,
				currency: 'usd',
				customer: customer.id
			});

			User.findOneAndUpdate({_id: id}, {
				$set: {customerId : customer.id}
			}, (err, data) => {
				if(err){
					console.log(err);
				} 
				else {
					console.log(data);
				}
			});
		});
	});


	//charge a customer with a saved card
	app.post('/charge/:id', (req,res) => {
		//console.log('AYO ' + req.body.amount)
		let amount = (req.body.amount) * 100;
		console.log(amount);
		let customer;
		User.findById({ _id: req.params.id }, (err, user) => {
			if (err) {
				res.json(err);
			} else if (user) {
				customer = user.customerId;
			} else {
				res.json({ message: 'DB search error.' });
			}
		});
		stripe.charges.create({
			amount,
			customer,
			currency: 'usd'
		})
			.then(charge => res.json(charge))
			.catch(err => res.json(err));
	});

	//Sign-Up Route
	app.post('/user/signup', (req, res) => {
		const { email, password } = req.body;
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
	app.post(
		'/user/signin', 
		passport.authenticate('local'),
		(req, res) => {
			var userInfo = {
				id: req.user._id
			};
			res.send(userInfo);
		}
	);

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
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
	// });

};
