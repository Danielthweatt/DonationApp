
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

class DonateOptions extends Component {

	render () {
		return (
			<div>
				<button onClick={this.props.handleMoneyButton} value="5"> $5 </button>
  				<button onClick={this.props.handleMoneyButton} value="10"> $10 </button>
  				<button onClick={this.props.handleMoneyButton} value="20"> $20 </button>
				<button onClick={this.props.handleMoneyCustom} value='0'> Custom Payment </button>
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
