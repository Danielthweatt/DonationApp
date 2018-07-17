//Dependencies
const path = require('path');
const usersController = require('../controllers/usersController');
const keyPublishable = 'pk_test_xwATFGfvWsyNnp1dDh2MOk8I';
const secret = require('../config/config.js')
//console.log(secret)
const keySecret = secret.SECRET_KEY;
const stripe = require("stripe")(keySecret)
module.exports = function(app, passport, User){

	// Charge Route for no customer creation
	app.post("/charge", (req,res) => {
		console.log(req.body)
		//get to dollar amount by *100
		let amount = (req.body.amount) * 100;
		stripe.charges.create({
			amount,
			source: req.body.source,
			description: 'test charge',
			currency: 'usd',
			//receipt_email: req.body.email
		}).then(charge => res.send(charge))
		//confirmation email needed
	});

	//charge route first time logged in to save info
	app.post("/charge/:id", (req,res) => {
		let id = req.params.id;
		let amount = (req.body.amount) * 100;
		console.log(id)
		stripe.customers.create({
			email: req.body.email,
			//source is the token linked to their card
			source: req.body.source
		}).then((customer) => {
			stripe.charges.create({
				amount,
				currency: 'usd',
				customer: customer.id
			})

			User.findOneAndUpdate({_id: id}, {
				$set: {customerId : customer.id}
			}, (err, data) => {
				if(err){
					console.log(err)
				} 
				else {
					console.log(data)
				}
			})
		})
	})


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

	//see if user has account
	app.get('/user/:id', (req,res) => {
		User.findById({_id: req.params.id}, (err, data) => {
			if(err){
				res.json(err)
			} 
			else {
				res.json(data)
			}
		})
	})

	//React App
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
	// });

};
