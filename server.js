//Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require("path")
const app = express();
const stripe = require("stripe")("sk_test_AKVA7CFMVqdEG0ZnhF7uiLz7");
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Serving Static Assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Routes
app.use(routes);

app.post("/charge", async(req,res) => {
	//console.log(req.body)
	try {
		let {status} = await stripe.charges.create({
			//in cents
			amount: 50,
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
