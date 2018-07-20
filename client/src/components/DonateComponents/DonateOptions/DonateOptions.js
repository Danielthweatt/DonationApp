
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
import Button from '@material/react-button/dist'; 

class DonateOptions extends Component {

	render () {
		return (
			<div className="btn-group" role="group">
				<button value="5" onClick={this.props.handleMoneyButton} type={Donate}>$5</button>
				<button value="10" onClick={this.props.handleMoneyButton} type={Donate}>$10</button>
				<button value="20" onClick={this.props.handleMoneyButton} type={Donate}>$20</button>
			Custom Amount <input onChange={this.props.handleMoneyCustom} value={this.props.customAmount} type="number" step="0.01" min="0.01" type={Donate}/>
			</div>
		);
	}
	
		
	
	
}

export default DonateOptions; 
