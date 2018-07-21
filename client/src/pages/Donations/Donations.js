import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonationInput from '../../components/DonateComponents/DonationInput'; 
import DonationImpact from '../../components/DonateComponents/DonationImpact'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 

class Donations extends Component {

	render() {
		return (
			<Wrapper>
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<DonationImpact />
				<Footer />
			</Wrapper>
		);
	}
}

export default Donations; 
