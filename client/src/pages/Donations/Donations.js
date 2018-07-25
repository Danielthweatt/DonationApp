import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonationInput from '../../components/DonateComponents/DonationInput'; 
import DonationImpact from '../../components/DonateComponents/DonationImpact'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 
import DonationModal from '../../components/DonateComponents/DonationModal';

class Donations extends Component {
	constructor(props) {
		super(props);

		this.state = { isOpen: false };
	}

	onClose = () => {
		this.setState((prevState)=>({isOpen: !prevState.isOpen}))
	}

	render() {
		return (
			<Wrapper>
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				{	this.state.isOpen ? (<DonationModal 
					onClose={this.onClose}>
          Thank you for making a difference :)
				</DonationModal>) : null}
				<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<DonationImpact />
				<Footer />
			</Wrapper>
		);
	}
}

export default Donations; 
