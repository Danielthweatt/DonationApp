
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
import './DonateOptions.css'; 
// Why wont this work? https://react-mdc.github.io/#/ripple
// import Ripple from 'react-material-ripple'; 
import Button from '@material-ui/core/Button';


class DonateOptions extends Component {



	render () {
		return (

			<div className="row">
				<div className="col-3">
					{/* <Ripple.Meta color="accent"> */}
					<Button className={this.props.buttonClicked === '5' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="5"> $5 </Button>
					{/* </Ripple.Meta> */}
				</div>
				<div className="col-3">
  				<Button className={this.props.buttonClicked === '10' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="10"> $10 </Button>
				  </div>
				  <div className="col-3">
  				<Button className={this.props.buttonClicked === '20' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyButton} value="20"> $20 </Button>
				  </div>
				  <div className="col-3">
					<Button className={this.props.buttonClicked === '' ? 'donation-button-clicked': 'donation-button'} onClick={this.props.handleMoneyCustom} value=''> Custom Payment </Button>
				</div>
			{/* <div>
				<button onClick={this.props.handleMoneyButton} value="5"> $5 </button>
  				<button onClick={this.props.handleMoneyButton} value="10"> $10 </button>
  				<button onClick={this.props.handleMoneyButton} value="20"> $20 </button>
				<button onClick={this.props.handleMoneyCustom} value='0'> Custom Payment </button> */}
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
