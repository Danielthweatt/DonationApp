import React, { Component } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input'; 
import './ForgotPasswordForm.css';


class ForgotPasswordForm extends Component {

	state = {
		email: '',
		message: false,
		messageContent: ''
	}	

	handleEmailInput = e => {
		this.setState({email: e.target.value});
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
					messageContent: res.email
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
				<form>
					<Input title="Email" name="Email" type="text" value={this.state.email} handleInput={this.handleEmailInput}/>
					<input type="submit" onClick={this.handleSubmit}/>
				</form>
				{this.state.message ? (
					<p>{this.state.messageContent}</p>
				) : (
					<div></div>
				)}
				<Link to="/signup">Sign Up</Link>
			</div>
		);
	}
}

export default ForgotPasswordForm; 