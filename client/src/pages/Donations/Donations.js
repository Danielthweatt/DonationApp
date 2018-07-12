import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonateOptions from '../../components/DonateComponents/DonateOptions'; 
import DonationInput from '../../components/DonateComponents/DonationInput'; 
import DonationImpact from '../../components/DonateComponents/DonationImpact'; 
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
