import React, { Component } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input'; 
import './ForgotPasswordForm.css';


class ForgotPasswordForm extends Component {

	state = {
		email: '',
		password: '',
		confirmPassword: '',
		message: false,
		messageContent: '',
		reset: false
	}
	
	componentDidMount(){
		this.setState({
			reset: this.props.userInfo.reset
		});
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

	handleSubmit = event => {
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

	render() {
		return (
			<div>
				{this.state.reset ? (
					<div></div>
				) : (
					<form>
						<Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
						<input type="submit" onClick={this.handleSubmit}/>
					</form>
				)}

				{this.state.reset === 'success' ? (
					<form>
						<Input title="Password" name="Password" type="password" value={this.state.password} handleInput={this.handlePasswordInput}/>
						<Input title="Confirm Password" name="Confirm Password" type="password" value={this.state.confirmPassword} handleInput={this.handlePasswordConfirmInput}/>
						<input type="submit" onClick={this.handleSubmit}/>
					</form>
				) : (
					<div></div>
				)}

				{this.state.reset === 'fail' ? (
					<p>Invalid or expired password reset token.</p>
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

export default ForgotPasswordForm; 