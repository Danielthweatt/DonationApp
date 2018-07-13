// Exporting Configuration
module.exports = function(passport, User){

	const LocalStrategy = require('passport-local').Strategy;

	// called on login, saves the id to session req.session.passport.user = {id:'..'}
	passport.serializeUser(function(user, done){
		console.log('*** serializeUser called, user: ');
		console.log(user); // the whole raw user object!
		console.log('---------');
		done(null, {_id: user._id});
	});

	// user object attaches to the request as req.user
	passport.deserializeUser(function(id, done){
		console.log('DeserializeUser called');
		User.findOne(
			{ _id: id },
			'username',
			(err, user) => {
				console.log('*** Deserialize user, user:');
				console.log(user);
				console.log('--------------');
				done(err, user);
			}
		);
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
					return done(null, false, { message: 'Incorrect username' });
				}
				if (!user.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, user);
			});
		}
	));

};
