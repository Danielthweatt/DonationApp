import React from 'react';

const Input = props => (
	<div className="input-group">
		<div className="input-group-prepend"> 
			<span className="input-group-text">{props.title}</span>
		</div>
		<input onChange={props.handleInput} type={props.type} className="form-control" aria-label="Input field" />
	</div>
);

export default Input; 