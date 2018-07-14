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
		amount:""
	}

	handleNameInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}

	handleFive = e => {
		console.log(e.target.value)
		this.setState({amount: e.target.value})
	}

	handleTen = e => {
		console.log(e.target.value)
		this.setState({amount: e.target.value})
	}

	handleTwenty = e => {
		console.log(e.target.value)
		this.setState({amount: e.target.value})
	}

	handleCustom = e => {
	}

	onToken = (token) => {
        axios.post('/charge', {
			description: 'example charge',
			email: this.state.email,
			source: token.id,
			amount: this.state.amount
        }).then((data) => {
            console.log(data.status)
            if (data.status === 200){
				alert('it worked!')
				//clear state values
				this.setState({
					name:"",
					email:"",
					amount:""
				})
				//probs take this out?
				window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err)
        });
	}
	
	render() {
		console.log(this.props.userInfo);
		return (
			<div className = "donation-input">
				
			<DonateOptions 
				numValue="8.00"
				handleFive={this.handleFive}
				handleTen={this.handleTen}
				handleTwenty={this.handleTwenty}
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
			
			<StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
				<Elements>
				<StripeCheckout
					name={this.state.name}
					email={this.state.email}
					token={this.onToken}
					stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
				/>
				</Elements>
			</StripeProvider>
			
		</div>
		)
	}
};

export default DonationInput;