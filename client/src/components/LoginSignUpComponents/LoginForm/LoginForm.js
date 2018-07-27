import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../Input';
import ButtonPrimary from '../../Buttons/ButtonPrimary'

class LoginForm extends Component {
	constructor() {
        super();
        this.state = {
            email: '',
            password: '',
			redirectTo: null,
			message: false,
			messageContent: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);  
    }


	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handlePasswordInput = e => {
		this.setState({password: e.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			message: false,
			messageContent: ''
		});
		if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email address.'
			});
		} else if (!this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please enter your password.'
			});
		} else {
			const signInInfo = {
				email: this.state.email,
				password: this.state.password
			};
        	axios.post('/user/signin', signInInfo).then(response => {
				if (response.status === 200) {
					if (response.data.message) {
						this.setState({
							message: true,
							messageContent: response.data.message
						});
					} else {
                		this.props.updateUser({
							loggedIn: true,
							userId: response.data.id,
							email: response.data.email,
							hasCustomerAccount: response.data.hasCustomerAccount,
							firstName: response.data.firstName,
							lastName: response.data.lastName
                		});
                		this.setState({
                    		redirectTo: '/'
						});
					}
            	}
        	}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Login error.'
				});
            	console.log('Login error:');
            	console.log(err);    
			});
		}
    }

	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
			return (
				<div>
					<form>
						<Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
						<Input title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
						<ButtonPrimary type="submit" handleClick={this.handleSubmit}>Submit</ButtonPrimary>
					</form>
					{this.state.message ? (
						<p>{this.state.messageContent}</p>
					) : (
						<div></div>
					)}
					<Link to="/signup">Sign Up</Link> <br/>
					<Link to="/forgot">Forgot Password?</Link>
				</div>
			)
		}
	}
};

export default LoginForm;