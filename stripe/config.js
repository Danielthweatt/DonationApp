const keys = {
	SECRET_KEY: process.env.NODE_ENV === 'production' ? 
	process.env.SECRET_KEY : 'sk_test_AKVA7CFMVqdEG0ZnhF7uiLz7'
};

module.exports = keys;