const keys = {
	SECRET_KEY: process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'sk_test_dBFKZCbJIsFNMhXnuhW7vCkr'
};

module.exports = keys;