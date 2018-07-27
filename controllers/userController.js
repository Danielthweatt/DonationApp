module.exports = function(User){
	return {
		signUp: function(email, res, firstName, lastName, password){
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
					newUser.save((err) => {
						if (err) return res.status(422).send(err);
						res.send('Success');
					});
				}
			});
		},
		findLoggedInUser: function(userId, res){
			User.findById({_id: userId}, (err, user) => {
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
					res.send({ userId: user._id});
				}
			});
		},
		resetPassword: function(userId, res, password){
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
		updatePassword: function(userId, res, password){
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
		updateUserPaymentInfo: function(userId, res, stripe, data){
			User.findById({_id: userId}, (err, user) => {
				if (err) {
					res.status(422).send(err);
				} else {
					stripe.customers.update(user.customerId, {
						source: data
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
									customerId : ''
								}
							}, {
								new: true
							}, (err, user) => {
								if (err) {
									res.status(422).send(err);
								} else {
									res.send({
										user: {
											userId: user._id,
											firstName: user.firstName,
											lastName: user.lastName,
											email: user.email,
											customerId: user.customerId,
											hasCustomerAccount: false
										}
									});
								}
							});
						} 
					});
				}
			});
		},
		chargeSavedUser: function(id, res, stripe, amount){
			User.findById({ _id: id }, (err, user) => {
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
		}

	};
};