import React from 'react';
// import "./Wrapper.css";

const Wrapper = (props) => (
	<div className="container" /*style= {{width: '800px'}}*/ >
		{/* <div className="page-header"><h1>NYT bologna</h1></div> */}
		{props.children}
	</div>
);

export default Wrapper;