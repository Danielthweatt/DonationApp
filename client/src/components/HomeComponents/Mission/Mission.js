import React from 'react';

class Mission extends React.Component {
	render () {
		return (
			<div className="card text-center">
				<center>
                    <h2>Our Mission</h2>
                    <hr></hr>
                </center>
                <br></br>
				{/* <div className="card-header">
                    MISSION!
				</div> */}
				<div className="card-body">
					<h5 className="card-title">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">Go somewhere</a>
				</div>
				<div className="card-footer text-muted">
                    2 days ago
				</div>
			</div>
		);
	}
}


export default Mission;