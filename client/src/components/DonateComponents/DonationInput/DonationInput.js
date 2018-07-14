import React, { Component } from 'react';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import Checkout from '../Checkout'

class DonationInput extends Component {

	state= {
		name:"",
		email:"",
	}

	handleNameInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value})
	}

	render() {
		return (
			<div className = "donation-input">
				
			<Input 
				title = "Name"
				handleInput={this.handleNameInput}
			/>
			
			<Input 
				title = "Email"
				handleInput={this.handleEmailInput}
			/>

			{/* <Input
				title = "Credit Card"
				handleInput={this.handleCardInput}
			/> */}

			<StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
				<Elements>
					<Checkout/>
				</Elements>
			</StripeProvider>
			
		</div>
		)
	}
};

export default DonationInput;