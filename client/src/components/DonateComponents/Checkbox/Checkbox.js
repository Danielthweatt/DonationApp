import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CBox = props => (
	<div className="checkbox">
		{props.hasCustomerAccount ? (
			null
		) : (
			<div>
				<label htmlFor="save-payment">Save My Payment Information</label>
				<Checkbox id="save-payment"  onChange={props.handleCheckbox} />
			</div>
		)}
		{!props.hasSubscription && props.hasCustomerAccount ? (
			<div>
				<label for="save-subscribe">Monthly Donation</label>
				<Checkbox id="save-subscribe" onChange={props.handleSubscribe}/>
			</div>
		) : (
			null
		)}
	</div>
);

export default CBox;