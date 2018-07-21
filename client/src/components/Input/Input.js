import React from 'react';

const Input = props => (
	<div className="input-group">
		<div className="input-group-prepend"> 
			<span className="input-group-text">{props.title}</span>
		</div>
		<input name={props.name} type={props.type} value={props.value} onChange={props.handleInput} className="form-control" aria-label="Input field" />
	</div>
);

export default Input; 