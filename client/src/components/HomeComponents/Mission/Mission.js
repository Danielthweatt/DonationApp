import React from 'react';
import './Mission.css'
import ButtonPrimary from '../../Buttons/ButtonPrimary'

class Mission extends React.Component {
	render () {
		return (
			<div className="card mission-card text-center">
				<center>
                    <h2>Our Mission</h2>
                    <hr></hr>
                </center>
				<div className="card-body">
					<p className="card-text">Making sure the Earth exists for the next generation.</p>
					<ButtonPrimary linkUrl="/about">About Us</ButtonPrimary>
				</div>
			</div>
		);
	}
}


export default Mission;