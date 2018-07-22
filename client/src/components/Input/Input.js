import React from 'react';
// import mdcInput from '@material/textfield/mdc-text-field';

const Input = props => (
	<div class="mdc-text-field">
		<div className="input-group">
			<div className="input-group-prepend"> 
				<span className="input-group-text">{props.title}</span>
			</div>
			<input className = "mdc-text-field__input" name={props.name} type={props.type} value={props.value} onChange={props.handleInput} className="form-control" aria-label="Input field" />
		</div>
	</div>
);

export default Input; 