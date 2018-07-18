
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 

const DonateOptions = props => (

	<div class="btn-group" role="group">
		<button value="5" onClick={props.handleFive} >$5</button>
		<button value="10" onClick={props.handleTen}>$10</button>
		<button value="20" onClick={props.handleTwenty} >$20</button>
		<button value={props.numValue}>Custom Amount</button>
	</div>
)

export default DonateOptions; 
