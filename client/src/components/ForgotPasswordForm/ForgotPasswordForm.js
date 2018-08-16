import React, { Component } from 'react'; 
import API from '../../utils/API';
import { Redirect, Link } from 'react-router-dom';
import Input from '../Input'; 
import './ForgotPasswordForm.css';
import ButtonPrimary from '../Buttons/ButtonPrimary'


class ForgotPasswordForm extends Component {
	state = {
		userId: null,
		email: null,
		password: null,
		confirmPassword: null,
		message: false,
		messageContent: null,
		resetOrForgot: null,
		redirectTo: null
	}

	componentDidMount = () => {
		if (this.props.userInfo.resetOrForgot === 'reset') {
			API.resetUserPasswordCheck(window.location.pathname.slice(7)).then(res => { 
				if (res.message) {
					this.setState({
						message: true,
						messageContent: res.message,
						resetOrForgot: 'reset fail'
					});
				} else {
					this.setState({
						userId: res.data.userId,
						resetOrForgot: 'reset success' 
					});
				}
			}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				console.log('Something went wrong: ');
				console.log(err);
			});
		} else {
			this.setState({
				resetOrForgot: 'forgot'
			});
		}
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

	handleEmailSubmit = event => {
		event.preventDefault();
		this.setState({
			message: false,
			messageContent: null
		});
		if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email.'
			});
		} else {
			API.forgotUserPassword(this.state.email).then(res => 
				this.setState({
					message: true,
					messageContent: res.data
				})
			).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				console.log('Something went wrong: ');
				console.log(err);
			});
		}
	}

	handlePasswordSubmit = event => {
		event.preventDefault();
		this.setState({
			message: false,
			messageContent: null
		});
		if (!this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please enter your password.'
			});
		} else if (this.state.password.indexOf('$') !== -1) {
            this.setState({
				message: true,
				messageContent: 'Passwords cannot contain a $ symbol.'
			});
		} else if (this.state.confirmPassword !== this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please re-enter a matching password.'
			});
		} else {
			API.resetUserPassword(this.state.userId, this.state.password).then(() => 
				this.setState({
					redirectTo: '/'
				})
			).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				console.log('Something went wrong: ');
				console.log(err);
			});
		}
	}

	render() {
		if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else if (this.props.userInfo.loggedIn) {
			return <Redirect to={{ pathname: '/' }} />
		} else {
			return (
				<div>
					{this.state.resetOrForgot === 'forgot' ? (
						<div>
							<h4>Please enter your email address to reset your password:</h4>
							<form>
								<Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
								<ButtonPrimary type="submit" handleClick={this.handleEmailSubmit}>Submit</ButtonPrimary>
							</form>
						</div>
					) : (
						null
					)}

					{this.state.resetOrForgot === 'reset success' ? (
						<div>
							<h4>Please reset your password now:</h4>
							<form>
								<Input title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
								<Input title="Confirm Password" name="Confirm Password" type="password" value={this.state.confirmPassword} handleInput={this.handlePasswordConfirmInput}/>
								<ButtonPrimary type="submit" handleClick={this.handlePasswordSubmit}>Submit</ButtonPrimary>
							</form>
						</div>
					) : (
						null
					)}

					{this.state.message ? (
						<p>{this.state.messageContent}</p>
					) : (
						null
					)}

					<Link to="/login">Login</Link> <br/>
					<Link to="/signup">Sign Up</Link>
				</div>
			);
		}
	}
}

export default ForgotPasswordForm; 