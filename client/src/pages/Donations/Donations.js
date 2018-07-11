import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonateOptions from '../../components/DonateOptions/DonateOptions'; 
import DonationInput from '../../components/DonationInput/DonationInput'; 
import DonationImpact from '../../components/DonationImpact/DonationImpact'; 

class Donations extends Component {
	render() {
		return (
			<div>
				<DonateOptions />
				<DonationInput />
				<DonationImpact />
			</div>
		);
	}
}

export default Donations; 
