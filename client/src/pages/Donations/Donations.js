import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonationInput from '../../components/DonateComponents/DonationInput'; 
import DonationImpact from '../../components/DonateComponents/DonationImpact'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 

class Donations extends Component {

	render() {
		return (
			<div>
				<Header page="donations" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>
					<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<DonationImpact />
					
				</Wrapper>
				<Footer />
			</div>
		);
	}
}

export default Donations; 
