import axios from 'axios';

export default {
	checkUser: function(){
		// Route to check if a user is logged in
		return axios.get('/user');
	},
	signUp: function(signUpInfo){
		return axios.post('/user/signup', signUpInfo);
	},
	login: function(signInInfo){
		return axios.post('/user/signin', signInInfo);
	},
	updateUserInfo: function(userId, firstName, lastName, email){
		return axios.put(`/user/update/${userId}`, {
			firstName,
			lastName,
			email
		});
	},
	updateUserPassword: function(userId, password){
		return axios.put(`/user/update/${userId}`, {
			password
		});
	},
	updateUserPaymentInfo: function(userId, email, source){
		return axios.put(`/user/charge/update/${userId}`,{
			email,
			source
		});
	},
	deleteUserPaymentInfo: function(userId){
		return axios.delete(`/user/charge/update/${userId}`);
	},
	logout: function(){
		return axios.post('/user/signout');
	},
	forgotUserPassword: function(email){
		return axios.post('/user/forgot', {
			email
		});
	},
	resetUserPasswordCheck: function(token){
		return axios.get(`/user/reset/check/${token}`);
	},
	resetUserPassword: function(userId, password){
		return axios.put(`/user/reset/${userId}`, {
			password
		});
	},
	charge: function(email, source, amount){
		return axios.post('/charge', {
			email,
			source,
			amount
		});
	},
	chargeAndSaveAUser: function(userId, email, source, amount){
		return axios.post(`/charge/create/${userId}`, {
			email,
			source,
			amount
		});
	},
	chargeSavedUser: function(userId, amount){
		return axios.post(`/charge/${userId}`, {
			amount
		});
	},
	startASubscription: function(userId, amount){
		return axios.post(`/charge/subscription/${userId}`, {
			amount
		});
	}
};