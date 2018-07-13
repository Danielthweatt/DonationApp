import React, { Component } from 'react';
import Input from '../../Input'; 

class LoginForm extends Component {

	state= {
		email:"",
		password:""
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}

	handlePasswordInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	render() {
		return (
			<div>
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
						<input type="submit"/>
					</div>
				</form>
				<a href="/signup">Sign Up</a>
			</div>
		)
	}
};

export default LoginForm;