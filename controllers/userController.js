module.exports = function(User){
	return {
		findLoggedInUser: function(userId, res){
			User.findById({_id: userId}, (err, user) => {
				if (err) {
					res.status(422).end(err);
				} else {
					if (user.customerId) {
						res.send({
							user: {
								userId: user._id,
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								hasCustomerAccount: true,
								hasSubscription: user.hasSubscription
							}
						});
					} else {
						res.send({
							user: {
								userId: user._id,
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								hasCustomerAccount: false,
								hasSubscription: user.hasSubscription
							}
						});
					}
				}
			});
		},
		signUp: function(email, res, firstName, lastName, password){
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					console.log('User signup db search error: ', err);
					res.status(422).send(err);
				} else if (user) {
					res.send({
						error: `Sorry, there is already a user with the email address: ${email}`
					});
				}
				else {
					const newUser = new User({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password
					});
					newUser.save((err) => {
						if (err) return res.status(422).send(err);
						res.send('Success');
					});
				}
			});
		},
		updateUserInfo: function(userId, firstName, lastName, email, res){
			User.findOneAndUpdate({ _id: userId }, {
				$set: {
					firstName: firstName,
					lastName: lastName,
					email: email
				}
			}, (err, user) => { 
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.status(422).send('Something went wrong.');
				} else {
					res.send({
						firstName: firstName,
						lastName: lastName,
						email: email
					});
				}
			});
		},
		updateUserPassword: function(userId, res, password){
			User.findOne({ _id: userId }, (err, user) => { 
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.status(422).send('Something went wrong.');
				} else {
					user.password = password;
					user.save(function(err){
						if (err) {
							res.status(422).send(err);
						} else {
							res.send('Success');
						}
					});
				}
			});
		},
		updateUserPaymentInfo: function(userId, res, stripe, source){
			User.findById({_id: userId}, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else {
					stripe.customers.update(user.customerId, {
						source: source
					}, (err, confirmation) => {
						if (err) {
							res.status(500).send(err);
						} else {
							console.log(confirmation);
							res.send('Success');
						}
					});
				} 
			});
		},
		deleteUserPaymentInfo: function(userId, res, stripe){
		    User.findById({_id: userId}, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else {
					stripe.customers.del(user.customerId, (err, confirmation) => {
						if (err) {
							res.status(500).send(err);
						} else {
							console.log(confirmation);
							User.findOneAndUpdate({_id: userId}, {
								$set: {
									customerId: '',
									hasSubscription: false
								}
							}, (err) => {
								if (err) {
									res.status(422).send(err);
								} else {
									res.send('Success');
								}
							});
						} 
					});
				}
			});
		},
		setPasswordResetToken: function(email, res, token, done){
			User.findOne({ email: email }, (err, user) => { 
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.send('Could not find a user account with that email address.');
				} else {
					user.passwordResetToken = token;
					user.passwordResetTokenExpiration = Date.now() + 3600000;
					user.save(function(err){
						done(err, token, user);
					});
				}
			});
		},
		checkPasswordResetToken: function(token, res){
			User.findOne({
				passwordResetToken: token,
				passwordResetTokenExpiration: {
					$gt: Date.now()
				} 
			}, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.send({ message: 'Password reset token invalid or expired.' });
				} else {
					res.send({ userId: user._id });
				}
			});
		},
		resetUserPassword: function(userId, res, password){
			User.findOne({ _id: userId }, (err, user) => { 
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.status(422).send('Something went wrong.');
				} else {
					user.passwordResetToken = '';
					user.passwordResetTokenExpiration = null;
					user.password = password;
					user.save(function(err){
						if (err) {
							res.status(422).send(err);
						} else {
							res.send('Success');
						}
					});
				}
			});
		},
		addCustomerId: function(userId, customerId, res){
			User.findOneAndUpdate({_id: userId}, {
				$set: {customerId: customerId}
			}, (err) => {
				if (err) {
					res.status(422).send(err);
				} 
				else {
					res.send('Success');
				}
			});
		},
		chargeSavedUser: function(userId, res, stripe, amount){
			User.findById({ _id: userId }, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else if (user) {
					stripe.charges.create({
						amount: amount * 100,
						customer: user.customerId,
						currency: 'usd',
						receipt_email: user.email
					}).then(() => 
						res.send('Success')
					).catch(err => 
						res.status(500).send(err)
					);
				} else {
					res.status(422).send({ message: 'DB search error.' });
				}
			});
		},
		startSubscription: function(userId, res, stripe, amount){
			User.findById({ _id: userId }, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else if (user) {
					stripe.charges.create({
						amount: amount * 100,
						customer: user.customerId,
						currency: 'usd',
						receipt_email: user.email
					}).then(() => {
						stripe.products.create({
							name: 'Love Member',
							type: 'service' 
						}, (err, product) => {
							if (err) {
								res.status(500).send(err);
							} else {
								stripe.plans.create({
									nickname: 'Standard Monthly',
									product: product.id, 
									amount: amount * 100,
									currency: 'usd',
									interval: 'month',
									usage_type: 'licensed',
								}, (err, plan) => {
									if (err) {
										res.status(500).send(err);
									} else {
										stripe.subscriptions.create({
											customer: user.customerId,
											items: [
												{
													plan: plan.id,
												}
											]
										}, (err, subscription) => {
											if (err) {
												res.status(500).send(err);
											} else {
												console.log(subscription);
												user.hasSubscription = true;
												user.save(function(err){
													if (err) {
														res.status(422).send(err);
													} else {
														res.send('Success');
													}
												});
											}
										});
									}
								});
							}
						});
					}).catch(err => 
						res.status(500).send(err)
					);	
				} else {
					res.status(422).send({ message: 'DB search error.' });
				}
			});
		}
	};
};