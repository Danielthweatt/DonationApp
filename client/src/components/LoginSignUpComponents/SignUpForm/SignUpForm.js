import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Input'; 

class SignUpForm extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this); 
		this.handlePasswordConfirmInput = this.handlePasswordConfirmInput.bind(this); 
	}

	handleFirstNameInput = e => {
		this.setState({firstName: e.target.value});
	}

	handleLastNameInput = e => {
		this.setState({lastName: e.target.value});
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		this.setState({password: e.target.value});
	}

	handlePasswordConfirmInput = e => {
		this.setState({confirmPassword: e.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			const signUpInfo = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password
			};
			axios.post('/user/signup', signUpInfo).then(response => {
				if (!response.data.errmsg) {
					this.setState({ //redirect to login page
						redirectTo: '/'
					});
				} else {
					// To be replaced
					console.log('Username already taken');
				}
			}).catch(error => {
				console.log('Signup error: ');
				console.log(error);
			});
		} else {
			// To be replaced
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
						<Input title="First Name" name="First Name" type="text" value={this.props.firstName} handleInput={this.handleFirstNameInput}/>
					</div>
					<div>
						<Input title="Last Name" name="Last Name" type="text" value={this.props.lastName} handleInput={this.handleLastNameInput}/>
					</div>
					<div>
						<Input title="Email" name="Email" type="text" value={this.props.email} handleInput={this.handleEmailInput}/>
					</div>
					<div>
						<Input title="Password" name="Password" type="password" value={this.props.password} handleInput={this.handlePasswordInput}/>
					</div>
					<div>
						<Input title="Confirm Password" name="Confirm Password" type="password" value={this.props.confirmPassword} handleInput={this.handlePasswordConfirmInput}/>
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