// Exporting Configuration
module.exports = function(passport, User){

	const LocalStrategy = require('passport-local').Strategy;

	// Called on login, saves the id to session req.session.passport.user = {id:'..'}
	passport.serializeUser(function(user, done){
		done(null, {_id: user._id});
	});

	// User object attaches to the request as req.user
	passport.deserializeUser(function(id, done){
		User.findOne({ _id: id }, (err, user) => {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {message: 'Could not find a user account with that email address.'});
				}
				if (!user.checkPassword(password)) {
					return done(null, false, {message: 'Incorrect password.'});
				}
				return done(null, user);
			});
		}
	));

};
