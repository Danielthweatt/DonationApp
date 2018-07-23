//Dependencies
const path = require('path');
const keyPublishable = 'pk_test_laDoJCqgOQpou2PvCdG07DE2';
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
			//description: 'test charge',
			currency: 'usd',
			//receipt_email: req.body.email
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
			})
		
				.then(() => {
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

	app.post('/charge/subscription/:id', (req,res) => {
		console.log('here is the user/mongo id', req.params.id);
		stripe.customers.create({
			email: req.body.email,
			//source is the token linked to their card
			source: req.body.source
		}).then((customer) => {
			console.log('find it', customer.id); 
			stripe.charges.create({
				amount: req.body.amount * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: req.body.email
			}).then(() => {
				stripe.products.create({
					name: 'Love Member',
					type: 'service' 
				}, function(err, product) {
				// asynchronously called
					if (err) console.log(err);
					else {
						stripe.plans.create({
							nickname: 'Standard Monthly',
							product: product.id, 
							amount: req.body.amount * 100,
							currency: 'usd',
							interval: 'month',
							usage_type: 'licensed',
						}, function(err, plan) {
							// asynchronously called
							if (err) console.log(err);
			
							else {
								console.log('testies', customer.id); 
								stripe.subscriptions.create({
									customer: customer.id,
									items: [
										{
											plan: plan.id,
										}
									]
								}, function(err, subscription) {
									// asynchronously called
									if (err) console.log(err);
								
						
								});}
						});
					}});
			});
		});
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
				res.status(422).send(err);
			} else if (user) {
				res.send({
					error: `Sorry, there is already a user with the email: ${email}`
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
					if (err) return res.status(422).send(err);
					res.send(savedUser);
				});
			}
		});
	});

	//Sign-In Route
	app.post('/user/signin', passport.authenticate('local', {
		failureRedirect: '/user/signin/failure',
		failureFlash: true
	}), (req, res) => {
		let hasCustomerAccount = false;
		if (req.user.customerId) {
			hasCustomerAccount = true;
		}
		const userInfo = {
			id: req.user._id,
			email: req.user.email,
			hasCustomerAccount,
			firstName: req.user.firstName,
			lastName: req.user.lastName
		};
		res.send(userInfo);
	});

	app.get('/user/signin/failure', (req, res) => {
		let message = req.flash('error')[0];
		res.send({message});
	});

	//Check to see if signed-in Route
	app.get('/user', (req, res) => {
		if (req.user) {
			User.findById({_id: req.user._id}, (err, user) => {
				if (err) {
					res.send(err);
				} else {
					if (user.customerId) {
						res.send({
							user: {
								userId: user._id,
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								hasCustomerAccount: true
							}
						});
					} else {
						res.send({
							user: {
								userId: user._id,
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								hasCustomerAccount: false
							}
						});
					}
				}
			});
		} else {
			res.send({ user: null });
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

	//update customer card info
	app.put('/settings/:id', (req,res) => {
		let id = req.params.id;
		User.findById({_id: id}, (err, user) => {
			if (err) {
				res.send(err);
			} else {
				//console.log(user)
				//console.log('the req body',req.body)
				let customerId = user.customerId
				//update the customer card
				stripe.customers.update(customerId, {
					source: req.body.data
				}, (err, confirmation) => {
					if(err) console.log(err)
					else{
						res.send(confirmation);
					}
				});} 
		});
	});

	//delete a customer and delete cust id from db
	app.put('/settings/delete/:id', (req,res) => {
		console.log(req.params.id)
		let id = req.params.id;
		User.findById({_id: id}, (err, user) => {
			if(err) console.log(err)
			else {
				//console.log(user.customerId)
				stripe.customers.del(
					user.customerId,
					(err, confirmation) => {
						if (err) console.log(err)
						else {
							console.log(confirmation)
						}
					}
				  );
			}
		})
		.then(() => {
			//console.log('here')
			User.findOneAndUpdate({_id: id}, {
				$set: 
				{
					customerId : "",
				}}, {new: true}, (err, user) => {
						if (err) {
							res.status(422).send(err);
						} 
						else {
							console.log(user)
							res.send({user:{
								userId: user._id,
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email,
								customerId: user.customerId,
								hasCustomerAccount: false,
							}})
						}
					})
			})
		.catch(err => console.log(err))
	})
	

	//React App
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
	// });

};
