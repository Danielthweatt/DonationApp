//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcrypt-nodejs');
mongoose.promise = Promise;

//User Schema
const userSchema = new Schema({
	email: String,
	password: String,
	passwordResetToken: String,
	passwordResetTokenExpiration: Date,
	dateCreated: { 
		type: Date,
		default: Date.now
	}
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword){
		return bCrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bCrypt.hashSync(plainTextPassword, bCrypt.genSaltSync(8), null);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next){
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======');
		next();
	} else {
		console.log('models/user.js hashPassword in pre save');
		this.password = this.hashPassword(this.password);
		next();
	}
});

//User Model Creation
const User = mongoose.model('User', userSchema);

module.exports = User;
