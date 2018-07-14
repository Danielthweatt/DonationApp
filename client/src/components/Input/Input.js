import React from 'react';

const Input = props => (
	<div className="input-group">
		<div className="input-group-prepend">   
			<span className="input-group-text">{props.title}</span>
		</div>
		<input onChange={props.handleInput} type={props.type} name={props.name} className="form-control" aria-label="With textarea" />
	</div>
);

export default Input; 