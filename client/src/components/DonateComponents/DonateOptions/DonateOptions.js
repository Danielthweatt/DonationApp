
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

const DonateOptions = props => (

	<div class="btn-group" role="group">
		<button value="5" onClick={props.handleMoneyAmount} type={Donate}>$5</button>
		<button value="10" onClick={props.handleMoneyAmount} type={Donate}>$10</button>
		<button value="20" onClick={props.handleMoneyAmount} type={Donate}>$20</button>
		Custom Amount <input onChange={props.handleMoneyAmount} type="number" step="0.01" min="0.01" type={Donate}/>
	</div>
);

export default DonateOptions; 
