
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

const DonateOptions = props => (

	<div class="btn-group" role="group">
		<button value="5" onClick={props.handleFive} type={Donate}>$5</button>
		<button value="10" onClick={props.handleTen} type={Donate}>$10</button>
		<button value="20" onClick={props.handleTwenty} type={Donate}>$20</button>
		<button value={props.numValue} type={Donate}>Custom Amount</button>
	</div>
)

export default DonateOptions; 
