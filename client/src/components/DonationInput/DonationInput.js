import React, { Component } from 'react';
import Input from '../Input/Input'; 

class DonationInput extends Component {
	render () {
		return (
			<div className = "donation-input">
				<h3>Name</h3>
				<Input />
				<h3>Credit Card</h3>
				<Input />
				<h3>Email</h3>
				<Input />
			</div>
		);
	}
}

export default DonationInput;