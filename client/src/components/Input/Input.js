import React from 'react';
// If I use this I can reference this link: https://react-mdc.github.io/#/textfield
// import TextField, {HelperText, Input} from '@material/react-text-field';
// Need to get with backend fools to see if this is possible for their inputs

const Input = props => (
	<div className="input-group">
		<div className="input-group-prepend"> 
			<span className="input-group-text">{props.title}</span>
		</div>
		{/* below is how we get the material design to work for the text areas
		will need to change what it is referencing, since "Input is in all their .js in DonationInput" */}
		 {/* <TextField.Input name= */}
		<input name={props.name} type={props.type} value={props.value} onChange={props.handleInput} className="form-control" aria-label="Input field" />
	</div>
);

export default Input; 