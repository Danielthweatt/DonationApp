
import React,  { Component } from 'react'; 

// Why wont this work? https://react-mdc.github.io/#/ripple
// import Ripple from 'react-material-ripple'; 
import Button from '@material-ui/core/Button';
import './DonateOptions.css'; 
import { withStyles } from '@material-ui/core/styles';

const styles = {
	donationButton: {
		display: 'block', 
		height: '10vw', 
		width: '10vw', 
		borderRadius: '50%', 
		// border: '5px solid rgba(43, 138, 254, 0.5)', 
		fontFamily: 'Roboto Condensed, sans-serif',
		fontSize: '200%', 
		backgroundColor: 'white',
		background: 'linear-gradient(to right, rgba(43, 138, 254, 0.2),  rgba(43, 138, 254, 0.2))',
		overflow: 'hidden', 
		color: '#3B3D40', 
		boxShadow: 'none',
		margin: 'auto', 
		marginBottom: '10px', 
		 
	},
	donationButtonClicked: {
		display: 'block', 
		height: '10vw', 
		width: '10vw', 
		borderRadius: '50%', 
		fontFamily: 'Roboto Condensed, sans-serif',
		fontSize: '200%', 
		color: '#f9f9f9', 
		background: 'linear-gradient(to right, #2B89FE,  #6834FF)',
		overflow: 'hidden', 
		boxShadow: 'none',
		margin: 'auto', 
		marginBottom: '10px', 
		
	},
};

class DonateOptions extends Component {

	render () {
		return (
			
			<div className="row">
				<div className="col-6 col-sm-3 col-lg-3">
	
					<Button className={this.props.buttonClicked === '5' ? this.props.classes.donationButtonClicked: this.props.classes.donationButton} variant="fab" onClick={this.props.handleMoneyButton} value="5"> $5 </Button>
	
				</div>
				<div className="col-6 col-sm-3 col-lg-3">
  				<Button className={this.props.buttonClicked === '10' ? this.props.classes.donationButtonClicked: this.props.classes.donationButton} variant="fab" onClick={this.props.handleMoneyButton} value="10"> $10 </Button>
				  </div>
				  <div className="col-6 col-sm-3 col-lg-3">
  				<Button className={this.props.buttonClicked === '20' ? this.props.classes.donationButtonClicked: this.props.classes.donationButton} variant="fab" onClick={this.props.handleMoneyButton} value="20"> $20 </Button>
				  </div>
				  <div className="col-6 col-sm-3 col-lg-3">
					<Button className={this.props.buttonClicked === '' ? this.props.classes.donationButtonClicked: this.props.classes.donationButton} variant="fab" onClick={this.props.handleMoneyCustom} value=''> Custom Amount </Button>
				</div>
				
				{/* <div>
				<button onClick={this.props.handleMoneyButton} value="5"> $5 </button>
  				<button onClick={this.props.handleMoneyButton} value="10"> $10 </button>
  				<button onClick={this.props.handleMoneyButton} value="20"> $20 </button>
				<button onClick={this.props.handleMoneyCustom} value='0'> Custom Payment </button> */}
				{/* {this.props.custom ? (
					<div>
						<label for="custom-payment">Amount:</label>
						<Input id="custom-payment" onChange={this.props.handleMoneyCustom} value={this.props.customAmount} type="number" step="0.01" min="0.01" type={Donate}/>
					</div>
				) : (
					<div></div>
				)} */}
			</div>
		);
	}
	
		
	
	
}

export default withStyles(styles)(DonateOptions); 
