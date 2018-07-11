//Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serving Static Assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Routes
app.use(routes);

app.post("/charge", async(req,res) => {
	try {
		let {status} = await stripe.charges.create({
			amount: 2000,
			currency: "usd",
			description: "AN EXAMPLE CHARGE",
			source: req.body
		});

		res.json({status});
	} catch(err) {
		res.status(500).end();
	}
})
// Connection to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/donation_app');

// API server Start
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});
