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

		this.state = { 
			isOpen: false,
			isError: false
		};
	}

	handleModalOpen = () => {
		this.setState({ isOpen: true })
	}

	handleErrorOpen = () => {
		this.setState({ 
			
			isError: true
		})
	}

	onClose = () => {
		this.setState({
			isOpen: false,
			isError: false
		})
	}

	render() {
		console.beer(' Dat YUNG BEER=>', this.props)
		return (
			<div>
				<div className="pageHeight">
					<Header page="donations" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<Wrapper>
						{	this.state.isOpen && 
							<DonationModal 
								onClose={this.onClose}>
								Thank you for making a difference :)
							</DonationModal>
						}
						{	this.state.isError && 
							<DonationModal 
								onClose={this.onClose}>
								Something went wrong! :(
							</DonationModal>
						}
						<DonationInput updateUser={this.props.updateUser} userInfo={this.props.userInfo} handleModalOpen={ this.handleModalOpen } handleErrorOpen={this.handleErrorOpen}/>
						<DonationImpact />
						
					</Wrapper>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Donations; 
