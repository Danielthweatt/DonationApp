//Dependencies
const path = require('path');
const usersController = require('../controllers/usersController');
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");

module.exports = function(app, passport, User){

	//Charge Route
	app.post("/charge", async(req,res) => {
		try {
			let {status} = await stripe.charges.create({
				amount: 0000,
				currency: "usd",
				description: "AN EXAMPLE CHARGE",
				source: req.body
			});
	
			res.json({status});
		} catch(err) {
			res.status(500).end();
		}
	});

	//Sign-Up Route
	app.post('/user/signup', (req, res) => {
		console.log('User signup route hit');
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
		function (req, res, next) {
			console.log('User signin route hit, req.body: ');
			console.log(req.body);
			next();
		},
		passport.authenticate('local'),
		(req, res) => {
			console.log('User logged in: ' + req.user);
			var userInfo = {
				id: req.user._id
			};
			res.send(userInfo);
		}
	);

	//Check to see if signed-in Route
	app.get('/user', (req, res, next) => {
		console.log('Signin-check route hit, req.user: ');
		console.log(req.user);
		if (req.user) {
			res.json({ user: req.user });
		} else {
			res.json({ user: null });
		}
	});

	//Sign-Out Route
	app.post('/user/signout', (req, res) => {
		if (req.user) {
			console.log('Signing out.');
			req.logout();
			res.send({ msg: 'logging out' });
		} else {
			res.send({ msg: 'no user to log out' });
		}
	});

	//React App
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
	// });

};
