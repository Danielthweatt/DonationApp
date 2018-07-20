
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

class DonateOptions extends Component {

	render () {
		return (
			// <div className="btn-group" role="group">
			// 	<button value="5" onClick={this.props.handleMoneyButton} type={Donate}>$5</button>
			// 	<button value="10" onClick={this.props.handleMoneyButton} type={Donate}>$10</button>
			// 	<button value="20" onClick={this.props.handleMoneyButton} type={Donate}>$20</button>
			// Custom Amount <input onChange={this.props.handleMoneyCustom} value={this.props.customAmount} type="number" step="0.01" min="0.01" type={Donate}/>
			// </div>
			<div>
				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="5"/> 5 <br/>
  				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="10"/> 10 <br/>
  				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyButton} value="20"/> 20 <br/>
				<input type="radio" name="payment-amount" onChange={this.props.handleMoneyCustom} value=''/> Custom Payment <br/>
				<label for="custom-payment">Custom Payment Amount:</label>
				<input id="custom-payment" onChange={this.props.handleMoneyCustom} value={this.props.customAmount} type="number" step="0.01" min="0.01" type={Donate}/>
			</div>
		);
	}
	
		
	
	
}

export default DonateOptions; 
