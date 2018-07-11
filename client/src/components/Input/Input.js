import React from 'react';

const Input = props => (
	<div className="input-group">
		<div className="input-group-prepend">
			<span className="input-group-text">{props.title}</span>
		</div>
		<textarea className="form-control" aria-label="With textarea"></textarea>
	</div>
);

export default Input; 