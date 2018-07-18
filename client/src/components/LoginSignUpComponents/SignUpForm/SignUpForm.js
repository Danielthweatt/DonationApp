import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Input'; 

class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this); 
		this.handlePasswordConfirmInput = this.handlePasswordInput.bind(this); 
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}

	handlePasswordInput = e => {
		//console.log(e.target.value)
		this.setState({password: e.target.value})
	}

	handlePasswordConfirmInput = e => {
		//console.log(e.target.value)
		this.setState({confirmPassword: e.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			const signUpInfo = {
				email: this.state.email,
				password: this.state.password
			};
			axios.post('/user/signup', signUpInfo).then(response => {
				if (!response.data.errmsg) {
					this.setState({ //redirect to login page
						redirectTo: '/'
					});
				} else {
					console.log('Username already taken');
				}
			}).catch(error => {
				console.log('Signup error: ');
				console.log(error);
			});
		} else {
			alert("Please re-enter the same password.");
		}
	}

	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
			return (
				<form>
					<div>
						<label>Email:</label>
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
	}
};

export default SignUpForm;