//Dependencies
const path = require('path');
const keyPublishable = 'pk_test_laDoJCqgOQpou2PvCdG07DE2';
const secret = require('../config/config.js');
const keySecret = secret.SECRET_KEY;
const stripe = require('stripe')(keySecret);
const waterfall = require('async-waterfall');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = function(express, passport, userController){

	const router = express.Router();

	//Standard Charge Route
	router.post('/charge', (req, res) => {
		//get to dollar amount by *100
		stripe.charges.create({
			amount: req.body.amount * 100,
			source: req.body.source,
			currency: 'usd',
			//receipt_email: req.body.email
		}).then(charge => {
			console.log(charge);
			res.send('Success');
		}).catch(err => 
			res.status(500).send(err)
		);
	});

	//Charge and Save User Payment Info Route
	router.post('/charge/create/:userId', (req, res) => {
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
				userController.addCustomerId(req.params.userId, customer.id, res);
			}).catch(err => 
				res.status(500).send(err)
			);
		}).catch(err => 
			res.status(500).send(err)
		);
	
	});

	router.post('/charge/subscription/:id', (req, res) => {
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
	router.post('/charge/:userId', (req, res) => {
		userController.chargeSavedUser(req.params.userId, res, stripe, req.body.amount);
	});

	//Sign-Up Route
	router.post('/user/signup', (req, res) => {
		userController.signUp(req.body.email, res, req.body.firstName, req.body.lastName, req.body.password);
	});

	//Sign-In Route
	router.post('/user/signin', passport.authenticate('local', {
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

	router.get('/user/signin/failure', (req, res) => {
		let message = req.flash('error')[0];
		res.send({message});
	});

	//Check to see if signed-in Route
	router.get('/user', (req, res) => {
		if (req.user) {
			userController.findLoggedInUser(req.user._id, res);
		} else {
			res.send({ user: null });
		}
	});

	//Sign-Out Route
	router.post('/user/signout', (req, res) => {
		if (req.user) {
			req.logout();
			res.send({ message: 'Logging out' });
		} else {
			res.send({ message: 'No user to log out' });
		}
	});

	//Forgot Password Route
	router.post('/user/forgot', (req, res) => {
		waterfall([
			function(done){
				crypto.randomBytes(20, function(err, buf){
					const token = buf.toString('hex');
					done(err, token);
				});
			},
			function(token, done){
				userController.setPasswordResetToken(req.body.email, res, token, done);
			},
			function(token, user, done){
				let host;
				if (process.env.NODE_ENV === 'production') {
					host = req.headers.host;
				} else {
					host = 'localhost:3000';
				}
				const mailer = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'lovefoundation361@gmail.com',
						pass: 'Romadacama'
					}
				});
				const mailOptions = {
					to: user.email,
					from: 'lovefoundation361@gmail.com',
					subject: 'Love Foundation Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Love Foundation account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};
				mailer.sendMail(mailOptions, function(err){
					if (!err) {
						res.send('An e-mail has been sent to ' + user.email + ' with further instructions.');
					}
					done(err, 'done');
				});
			}
		], function(err){
			res.status(500).send(err);
		});
	});

	//Reset Password Token Check Route
	router.get('/user/reset/check/:token', function(req, res){
		userController.checkPasswordResetToken(req.params.token, res);
	});

	//Reset Password Route
	router.put('/user/reset/:userId', function(req, res){
		userController.resetPassword(req.params.userId, res, req.body.password);
	});

	// Update User Info Route
	router.put('/user/update/:userId', function(req, res){
		if (req.body.password) {
			userController.updatePassword(req.params.userId, res, req.body.password);
		} else {
			userController.updateUserInfo(req.params.userId, req.body.firstName, req.body.lastName, req.body.email, res);
		}
	});

	//update customer card info
	router.put('/user/charge/update/:userId', (req, res) => {
		userController.updateUserPaymentInfo(req.params.userId, res, stripe, req.body.data);
	});

	//delete a customer and delete cust id from db
	router.delete('/user/charge/update/:userId', (req,res) => {
		userController.deleteUserPaymentInfo(req.params.userId, res, stripe);
	});

	//React App
	if (process.env.NODE_ENV === 'production') {
		router.get('*', function(req, res) {
			res.sendFile(path.join(__dirname, '../client/build/index.html'));
		});
	}

	return router;

};
