import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import DonateOptions from '../DonateOptions'; 
import Checkbox from "../Checkbox";

class DonationInput extends Component {

	state = {
		name:"",
		email:"",
		amount:"",
		checked: false,
		rememberMe: false,
		customAmount: ""
	}

	
	handleNameInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}



	handleMoneyButton = e => {
		console.log(e.target.value);
		this.setState({
			customAmount: '',
			amount: e.target.value })
	}
	
	
	handleMoneyCustom = e => {
		this.setState({
			customAmount: e.target.value,
			amount: e.target.value })
	}

	checkMoneyInput = () => {
		const regex = /^\d+(?:\.\d{0,2})$/;
		console.log('testies', this.state.amount)

		if (!regex.test(this.state.amount))
			console.log("Invalid Number");
	}

	updatePaymentInfo = () => {}

	forgetMe = () => {}

	handleCheckbox = e => {
		this.setState({rememberMe: true})
	}

	onToken = (token) => {
		if (this.props.userInfo.loggedIn && this.state.rememberMe) {
			let userId = this.props.userInfo.mongoId
			//console.log(userId)
			axios.post('/charge/create/' + userId, {
				description:'save info charge',
				email: this.state.email,
				source: token.id,
				amount: this.state.amount,
				mongoId: this.props.userInfo.mongoId
			}).then((data) => {
				if(data.status === 200) {
					alert('customer saved!')
					this.setState({
						name:"",
						email:"",
						amount:""
					});
				}
			}).catch(err => console.log(err))

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
						name:"",
						email:"",
						amount:""
					});
					//probs take this out?
					window.location.reload();
            	}
        	})
        	.catch((err) => {
            	console.log(err)
			});
		}
	}

	chargeACustomer() {
		alert('press ok to go thru with this donation')
			//charge the customer instead of the card
			let userId = this.props.userInfo.mongoId
			//console.log(this.props.userInfo)
			axios.post('/charge/' + userId, {
				description: 'charge a customer',
				source: this.props.userInfo.customerId,
				amount: this.state.amount,
			}).then((data) => {
				console.log(data)
				// if(data.status === 200) {
				// 	alert('great job')
				// }
			}).catch(err => console.log(err))
	}

	
	render() {
		console.log(this.props.userInfo);
		return (
			<div className = "donation-input">
				
			<DonateOptions
				handleMoneyButton={this.handleMoneyButton}
				handleMoneyCustom={this.handleMoneyCustom}
				customAmount={this.state.customAmount}
				checkMoneyInput={this.checkMoneyInput}
			/>


			{this.props.userInfo.loggedIn ? (
				<div></div>
			) : (
				<Input 
					title = "Name"
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

			{this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount ? (
				<div></div>
			) : (
				<Checkbox
					handleCheckbox = {this.handleCheckbox}
				/>
			)}
			

			<StripeProvider apiKey="pk_test_laDoJCqgOQpou2PvCdG07DE2
">
				<Elements>
		
				<StripeCheckout
					allowRememberMe = {false}
					name={this.state.name}
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