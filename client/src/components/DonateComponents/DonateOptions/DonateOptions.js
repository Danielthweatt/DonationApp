
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
import './DonateOptions.css'; 
// import '@material/button/mdc-button';
// import Button from '@material/react-button/dist'; 

// const Button = React.createClass({
// 	getInitialState: function() {
// 	  return {
// 			className: 'donation-button'
// 	  };
	  
// 	},
	
// 	handleClick: function() {
// 	  this.setState({
// 			className: 'donation-button-clicked'
// 	  });
// 	},

// 	render : function() {
// 		return (
// 		  <div>
// 				<button 
// 			  onClick={this.handleClick} 
// 			  style={{backgroundColor:this.state.bgColor}}>Button</button>
// 		  </div>
// 		);
// 	  }
// });

class DonateOptions extends Component {



	render () {
		return (

			<div className="row">
				<div className="col-3">
					<button className={this.props.buttonClicked === '5' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="5"> $5 </button>
				</div>
				<div className="col-3">
  				<button className={this.props.buttonClicked === '10' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="10"> $10 </button>
				  </div>
				  <div className="col-3">
  				<button className={this.props.buttonClicked === '20' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="20"> $20 </button>
				  </div>
				  <div className="col-3">
					<button className={this.props.buttonClicked === '' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyCustom} value=''> Custom Payment </button>
				</div>
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
