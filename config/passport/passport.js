// Dependencies
const bCrypt = require('bcrypt-nodejs');

// Exporting Configuration
module.exports = function(passport, User){

	const LocalStrategy = require('passport-local').Strategy;

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done){
		const generateHash = function(password){
			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
		};
		User.findOne({email: email}, function(err, user){
			if (err) {
				return done(err);
			} else if (user) {
				return done(null, false, {
					message: 'That email is already taken'
				});
			} else {
				const userPassword = generateHash(password);
				const data = {
					email: email,
					password: userPassword,
				};
				User.create(data, function(err, newUser){
					if (err) {
						return done(err);
					} else {
						return done(null, newUser);
					}
				});           
			}
		});
	}));

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done){
		const isValidPassword = function(userpass, password){
			return bCrypt.compareSync(password, userpass);
		};
		User.findOne({email: email}, function(err, user){
			if (err) {
				return done(null, false, {
					message: 'Something went wrong with your Signin'
				});
			} else if (!user) {
				return done(null, false, {
					message: 'Email does not exist'
				});
			} else if (!isValidPassword(user.password, password)) {
				return done(null, false, {
					message: 'Incorrect password'
				});
			} else {
				return done(null, user);
			}
		});
	}));

};
