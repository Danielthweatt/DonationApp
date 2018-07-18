import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import DonateOptions from '../DonateOptions'; 
import Checkbox from "../Checkbox";

class DonationInput extends Component {

	state= {
		name:"",
		email:"",
		amount:"",
		checked: false,
		rememberMe: false,
	}

	handleNameInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}


	handleMoneyAmount = e => {
		console.log(e.target.value)
		this.setState({amount: e.target.value })
	}

	updatePaymentInfo = () => {}

	forgetMe = () => {}

	onToken = (token) => {
		if (this.props.userInfo.loggedIn && this.state.rememberMe) {

		} else if (this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount) {

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
	
	render() {
		console.log(this.props.userInfo);
		return (
			<div className = "donation-input">
				
			<DonateOptions
				handleMoneyAmount={this.handleMoneyAmount}
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


			<Checkbox/>

			<StripeProvider apiKey="pk_test_laDoJCqgOQpou2PvCdG07DE2
">
				<Elements>
				<StripeCheckout
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