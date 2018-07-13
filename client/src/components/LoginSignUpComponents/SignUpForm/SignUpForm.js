import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 

class SignUpForm extends Component {

	state = {
		email:"",
		password:"",
		confirmPassword:""
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}

	handlePasswordInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handlePasswordConfirmInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('Sign-up handleSubmit, email: ');
		console.log(this.state.email);
		const signUpInfo = {
			email: this.state.email,
			password: this.state.password
		};
		axios.post('/user/signup', signUpInfo).then(response => {
			console.log(response);
			if (!response.data.errmsg) {
				console.log('Successful signup');
				this.setState({ //redirect to login page
					redirectTo: '/login'
				});
			} else {
				console.log('username already taken');
			}
		}).catch(error => {
			console.log('Signup error: ');
			console.log(error);
		});
	}

	render() {
		return (
			<form>
				<div>
					<label>Username:</label>
					<Input title = "Name" name="email" handleInput={this.handleEmailInput}/>
				</div>
				<div>
					<label>Password:</label>
					<Input title = "Name" type="password" name="password" handleInput={this.handlePasswordInput}/>
				</div>
				<div>
					<label>Confirm Password:</label>
					<Input title = "Name" type="password" name="confirmPassword" handleInput={this.handlePasswordConfirmInput}/>
				</div>
				<div>
					<input type="submit" onClick={this.handleSubmit}/>
				</div>
			</form>
		)
	}
};

export default SignUpForm;