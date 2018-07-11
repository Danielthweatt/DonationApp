
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

class DonateOptions extends Component {
	render() {
		return (
			<div class="btn-group" role="group">
				<button data-id="5" type={Donate}>$5</button>
				<button data-id="10" type={Donate}>$10</button>
				<button data-id="20" type={Donate}>$20</button>
				<button data-id="" type={Donate}>Custom Amount</button>
			</div>
		);
	}
}

export default DonateOptions; 
