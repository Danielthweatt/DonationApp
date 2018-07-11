//Dependencies
const mongoose = require('mongoose');

//Schema Constructor
const Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
	email: { 
		type: String,
		required: true,
		unique: true
	},
	password: { 
		type: String,
		required: true
	},
	passwordResetToken: String,
	passwordResetTokenExpiration: Date,
	dateCreated: { 
		type: Date,
		default: Date.now
	}
});

//User Model Creation
const User = mongoose.model('User', userSchema);

module.exports = User;
