import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Input from '../Input'; 
import './ForgotPasswordForm.css';
import ButtonPrimary from '../Buttons/ButtonPrimary'


class ForgotPasswordForm extends Component {

	state = {
		userId: '',
		email: '',
		password: '',
		confirmPassword: '',
		message: false,
		messageContent: '',
		resetOrForgot: '',
		redirectTo: null
	}

	componentDidMount(){
		if (this.props.userInfo.resetOrForgot === 'reset') {
			axios.get(`/reset/check/${window.location.pathname.slice(7)}`).then(res => { 
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
			}).catch();
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
			messageContent: ''
		});
		if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email.'
			});
		} else {
			axios.post('/forgot', {
				email: this.state.email
			}).then(res => 
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
			messageContent: ''
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
			axios.put('/reset/' + this.state.userId, {
				password: this.state.password
			}).then(res => 
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
        } else {
			return (
				<div>
					{this.state.resetOrForgot === 'forgot' ? (
						<form>
							<Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
							<ButtonPrimary type="submit" handleClick={this.handleEmailSubmit}>Submit</ButtonPrimary>
						</form>
					) : (
						<div></div>
					)}

					{this.state.resetOrForgot === 'reset success' ? (
						<form>
							<Input title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
							<Input title="Confirm Password" name="Confirm Password" type="password" value={this.state.confirmPassword} handleInput={this.handlePasswordConfirmInput}/>
							<ButtonPrimary type="submit" handleClick={this.handlePasswordSubmit}>Submit</ButtonPrimary>
						</form>
					) : (
						<div></div>
					)}

					{this.state.message ? (
						<p>{this.state.messageContent}</p>
					) : (
						<div></div>
					)}

					<Link to="/login">Login</Link> <br/>
					<Link to="/signup">Sign Up</Link>
				</div>
			);
		}
	}
}

export default ForgotPasswordForm; 