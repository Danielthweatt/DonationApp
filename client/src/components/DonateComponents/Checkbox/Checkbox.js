import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CBox = props => (
	<div className="checkbox">
		{/* 
		<CBox />
		*/}
		<label for="save-payment">Save My Payment Information</label>
		<Checkbox id="save-payment"  onChange={props.handleCheckbox} />
		{/* <input type="checkbox" className="checkbox-style" id="save-payment" name="checkbox" onChange={props.handleCheckbox}/> */}
		<label for="save-subscribe">Monthly Donation</label>
		<Checkbox id="save-subscribe" onChange={props.handleSubscribe}/>
		{/* <input type="checkbox" className="checkbox-style" id="save-subscribe" name="subscribe-checkbox" onChange={props.handleSubscribe}/> */}
	</div>
);

export default CBox;