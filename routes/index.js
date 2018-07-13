//Dependencies
const path = require('path');
const usersController = require('../../controllers/usersController');

module.exports = function(app, passport, User){

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
