import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import DonateOptions from '../DonateOptions'; 
import Checkbox from "../Checkbox";

class DonationInput extends Component {

	state = {
		firstName:"",
		lastName: "",
		email:"",
		amount:"",
		rememberMe: false,
		customAmount: ""
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
			amount: e.target.value });
	}
	
	handleMoneyCustom = e => {
		this.setState({
			customAmount: e.target.value,
			amount: e.target.value });
	}

	updatePaymentInfo = () => {}

	forgetMe = () => {}

	handleCheckbox = () => {
		let newRememberMeValue = !this.state.rememberMe;
		this.setState({rememberMe: newRememberMeValue});
		console.log(this.state.rememberMe);
	}

	onToken = (token) => {
		if (this.props.userInfo.loggedIn && this.state.rememberMe) {
			let userId = this.props.userInfo.mongoId;
			axios.post('/charge/create/' + userId, {
				description: 'save info charge',
				email: this.state.email,
				source: token.id,
				amount: this.state.amount,
				mongoId: this.props.userInfo.mongoId
			}).then((data) => {
				if (data.status === 200) {
					console.log(data);
					alert('customer saved!');
					this.setState({
						firstName: "",
						lastName: "",
						email: "",
						amount: "",
						rememberMe: false
					});
				}
			}).catch(err => console.log(err));
		} else if (this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount) {
			alert('press ok to go thru with this donation');
			//charge the customer instead of the card
			let userId = this.props.userInfo.mongoId;
			axios.post('/charge/' + userId, {
				description: 'charge a customer',
				amount: this.state.amount
			}).then((data) => {
				console.log(data);
				if (data.status === 200) {
					alert('great job')
				}
			}).catch(err => console.log(err));
		} else {
			axios.post('/charge', {
				description: 'example charge',
				email: this.state.email,
				source: token.id,
				amount: this.state.amount,
				mongoId: this.props.userInfo.mongoId
        	}).then((data) => {
            	console.log(data.status)
            	if (data.status === 200){
					alert('it worked!')
					//clear state values
					this.setState({
						firstName: "",
						lastName: "",
						email: "",
						amount: "",
						rememberMe: false
					});
					//probs take this out?
					window.location.reload();
            	}
        	})
        	.catch((err) => {
            	console.log(err);
			});
		}
	}
	
	render() {
		return (
			<div className = "donation-input">
				
			<DonateOptions
				handleMoneyButton={this.handleMoneyButton}
				handleMoneyCustom={this.handleMoneyCustom}
				customAmount={this.state.customAmount}
			/>

			{this.props.userInfo.loggedIn ? (
				<div></div>
			) : (
				<Input 
					title = "First Name"
					handleInput={this.handleNameInput}
				/>
			)}

			{this.props.userInfo.loggedIn ? (
				<div></div>
			) : (
				<Input 
					title = "Last Name"
					handleInput={this.handleNameInput}
				/>
			)}

			{this.props.userInfo.loggedIn ? (
				<div></div>
			) : (
				<Input 
					title = "Email"
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
			
			<StripeProvider apiKey="pk_test_laDoJCqgOQpou2PvCdG07DE2">
				<Elements>
				<StripeCheckout
					allowRememberMe = {false}
					name={this.state.firstName}
					email={this.state.email}
					token={this.onToken}
					stripeKey={'pk_test_laDoJCqgOQpou2PvCdG07DE2'}
				/>
				</Elements>
			</StripeProvider>
			
		</div>
		)
	}
};

export default DonationInput;