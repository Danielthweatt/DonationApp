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
		console.beer = console.log.bind(console, '🍺');

		this.state = { isOpen: false };
	}

	handleModalOpen = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	onClose = () => {
		this.setState({isOpen: !this.state.isOpen})
	}

	render() {
		console.beer(' Dat YUNG BEER=>', this.props)
		return (
			<div>
				<Header page="donations" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>
					{	this.state.isOpen && 
						<DonationModal 
							onClose={this.onClose}>
							Thank you for making a difference :)
						</DonationModal>
					}
					<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} handleModalOpen={ this.handleModalOpen }/>
					<DonationImpact />
					
				</Wrapper>
				<Footer />
			</div>
		);
	}
}

export default Donations; 
