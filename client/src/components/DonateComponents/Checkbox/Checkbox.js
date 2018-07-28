import React from 'react';

const Checkbox = props => (

	<div className="checkbox">
		{this.props.hasCustomerAccount ? (
			<div></div>
		) : (
			<div>
				<label for="save-payment">Save My Payment Information</label>
				<input type="checkbox" id="save-payment" name="checkbox" onChange={props.handleCheckbox}/>
			</div>
		)}
		{!this.props.hasSubscription && this.props.hasCustomerAccount ? (
			<div>
				<label for="save-subscribe">Monthly Donation</label>
				<input type="checkbox" id="save-subscribe" name="subscribe-checkbox" onChange={props.handleSubscribe}/>
			</div>
		) : (
			<div></div>
		)}
	</div>
);

export default Checkbox;