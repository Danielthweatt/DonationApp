import React, { Component } from 'react';
import Input from '../../Input'; 

class SignUpForm extends Component {

	state= {
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

	render() {
		return (
			<form action="/signin" method="post">
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
					<input type="submit"/>
				</div>
			</form>
		)
	}
};

export default SignUpForm;