import React from 'react';
import {Link} from 'react-router-dom'
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
					<Link to="/about" >
						<ButtonPrimary handleClick={null}>About Us</ButtonPrimary>
					</Link>
				</div>
			</div>
		);
	}
}


export default Mission;