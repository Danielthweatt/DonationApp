import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import DonateOptions from '../../components/DonateComponents/DonateOptions'; 
import DonationInput from '../../components/DonateComponents/DonationInput'; 
import DonationImpact from '../../components/DonateComponents/DonationImpact'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 

class Donations extends Component {

	state = {
		five:"",
		ten:"",
		twenty:""
	}

	handleFive(e){
		//console.log(e.target.value)
		this.setState({five: e.target.value})
	}

	handleTen(e){
		console.log(e.target.value)
		this.setState({ten: e.target.value})
	}

	handleTwenty(e){
		console.log(e.target.value)
		this.setState({twenty: e.target.value})
	}

	handleCustom(e){
	}

	render() {
		return (
			<Wrapper>
				<Header />
				<DonateOptions 
					numValue="8.00"
					handleFive={this.handleFive}
					handleTen={this.handleTen}
					handleTwenty={this.handleTwenty}
				/>
				<DonationInput/>
				<DonationImpact />
				<Footer />
			</Wrapper>
		);
	}
}

export default Donations; 
