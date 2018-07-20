
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
import Button from '@material/react-button/dist'; 

<<<<<<< HEAD
const DonateOptions = props => (

	<div class="btn-group" role="group">
		<Button value="5" onClick={props.handleFive} type={Donate}>$5</Button>
		<Button value="10" onClick={props.handleTen} type={Donate}>$10</Button>
		<Button value="20" onClick={props.handleTwenty} type={Donate}>$20</Button>
		<Button value={props.numValue} type={Donate}>Custom Amount</Button>
	</div>
);
=======
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
>>>>>>> bfc1ff70fd8ec4a2419306f8c5581228ebc274a0

export default DonateOptions; 
