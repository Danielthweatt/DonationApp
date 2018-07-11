import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonateOptions from '../../components/DonateOptions/DonateOptions'; 
import DonationInput from '../../components/DonationInput/DonationInput'; 
import DonationImpact from '../../components/DonationImpact/DonationImpact'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 

class Donations extends Component {
	render() {
		return (
			<Wrapper>
				<Header />
				<DonateOptions />
				<DonationInput />
				<DonationImpact />
			</Wrapper>
		);
	}
}

export default Donations; 
