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
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>
					<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<DonationImpact />
					<Footer />
				</Wrapper>
			</div>
		);
	}
}

export default Donations; 
