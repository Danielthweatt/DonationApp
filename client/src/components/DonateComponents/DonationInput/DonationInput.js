import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import DonateOptions from '../DonateOptions'; 
import Checkbox from "../Checkbox";

class DonationInput extends Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		amount: '',
		customAmount: '',
		custom: false,
		rememberMe: false
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

	handleMoneyButton = e => {
		this.setState({
			customAmount: '',
			amount: e.target.value,
			custom: false
		});
	}
	
	handleMoneyCustom = e => {
		this.setState({
			customAmount: e.target.value,
			amount: '',
			custom: true
		});
	}

	handleCheckbox = () => {
		let newRememberMeValue = !this.state.rememberMe;
		this.setState({rememberMe: newRememberMeValue});
	}

	chargeACustomer() {
		//charge the customer instead of the card
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		axios.post('/charge/' + userId, {
			amount
		}).then(res => {
			if (res.status === 200) { 
				alert('Great job!');
			} else {
				alert('Something went wrong.');
			}
		}).catch(err => {
			console.log(err);
			alert('Something went wrong.');
		});
	}

	onToken = (token) => {
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		if (this.props.userInfo.loggedIn && this.state.rememberMe) {
			axios.post('/charge/create/' + userId, {
				description: 'charge',
				email: this.props.userInfo.email,
				source: token.id,
				amount
			}).then(res => {
				if (res.status === 200) {
					alert('Customer saved!');
					this.setState({
						rememberMe: false
					});
					this.props.updateUser({
						hasCustomerAccount: true
					});
				} else {
					alert('Something went wrong.');
				}
			}).catch(err => {
				console.log(err);
				alert('Something went wrong.');
			});
		} else {
			axios.post('/charge', {
				email: this.state.email,
				source: token.id,
				amount
        	}).then(res => {
				if (res.status === 200) {
					alert('it worked!');
					this.setState({
						firstName: '',
						lastName: '',
						email: '',
						rememberMe: false
					});
				} else {
					alert('Something went wrong.');
				}
        	}).catch((err) => {
				console.log(err);
				alert('Something went wrong.');
			});
		}
	}
	
	render() {
		return (
			<form className = "donation-input">
				
				<DonateOptions
					handleMoneyButton={this.handleMoneyButton}
					handleMoneyCustom={this.handleMoneyCustom}
					customAmount={this.state.customAmount}
					custom={this.state.custom}
				/>

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "First Name"
						name = "First Name"
						type="text"
						value={this.props.firstName}
						handleInput={this.handleFirstNameInput}
					/>
				)}

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "Last Name"
						name = "Last Name"
						type="text"
						value={this.props.lastName}
						handleInput={this.handleLastNameInput}
					/>
				)}

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "Email"
						name = "Email"
						type="text"
						value={this.props.email}
						handleInput={this.handleEmailInput}
					/>
				)}

				{this.props.userInfo.loggedIn && !this.props.userInfo.hasCustomerAccount ? (
					<Checkbox
						handleCheckbox = {this.handleCheckbox}
					/>
				) : (
					<div></div>
				)}
			
				{this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount ? (
					<button onClick={this.chargeACustomer}>Donate</button>
				) : (
					<StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
						<Elements>
						<StripeCheckout
							allowRememberMe = {false}
							name={`${this.state.firstName} ${this.state.lastName}`}
							email={this.state.email}
							token={this.onToken}
							stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
						/>
						</Elements>
					</StripeProvider>
				)}

			</form>
		)
	}
};

export default DonationInput;