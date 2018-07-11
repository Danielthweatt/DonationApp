import React, { Component } from 'react';
import Input from '../Input/Input'; 

class DonationInput extends Component {

	state= {
		name:"",
		card:"",
		email:""
	}

	handleNameInput = e => {
		//console.log(e.target.value)
		this.setState({name: e.target.value})
	}

	handleCardInput = e => {
		this.setState({card: e.target.value})
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
				title = "Credit Card"
				handleInput={this.handleCardInput}
			/>
			
			<Input 
				title = "email"
				handleInput={this.handleEmailInput}
			/>
			<div className="btn btn-primary">Submit</div>
		</div>
		)
	}
};

export default DonationInput;