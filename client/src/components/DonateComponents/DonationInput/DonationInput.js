import React, { Component } from 'react';
import Input from '../../Input'; 

class DonationInput extends Component {
	render () {
		return (
			<div className = "donation-input">
				
				<Input 
					title = "Name"
				/>
				
				<Input 
					title = "Credit Card"
				/>
				
				<Input 
					title = "email"
				/>
			</div>
		);
	}
}

export default DonationInput;