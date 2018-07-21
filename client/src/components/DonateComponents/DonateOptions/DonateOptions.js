
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
// import Button from '@material/react-button/dist'; 

class DonateOptions extends Component {

	render () {
		return (
			<div>
				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="5"/> $5 <br/>
  				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="10"/> $10 <br/>
  				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="20"/> $20 <br/>
				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyCustom} value=''/> Custom Payment <br/>
				{this.props.custom ? (
					<div>
						<label for="custom-payment">Amount:</label>
						<input id="custom-payment" onChange={this.props.handleMoneyCustom} value={this.props.customAmount} type="number" step="0.01" min="0.01" type={Donate}/>
					</div>
				) : (
					<div></div>
				)}
			</div>
		);
	}
	
		
	
	
}

export default DonateOptions; 
