
import React,  { Component } from 'react'; 
import Donate from '../Donate/Donate'; 
import Button from '@material/react-button/dist'; 

const DonateOptions = props => (

	<div class="btn-group" role="group">
		<Button value="5" onClick={props.handleFive} type={Donate}>$5</Button>
		<Button value="10" onClick={props.handleTen} type={Donate}>$10</Button>
		<Button value="20" onClick={props.handleTwenty} type={Donate}>$20</Button>
		<Button value={props.numValue} type={Donate}>Custom Amount</Button>
	</div>
);

export default DonateOptions; 
