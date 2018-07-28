import React from 'react'; 
import './AboutUs.css'; 
import logoImage from "../../../assets/images/Logo.png";

const AboutUs = () => (
	<div className="card" id="about">
		<div className="row no-gutters">
			<div className="col-auto">
				<div className="about-logo-img-styling">
					<img src={logoImage} className="img-fluid" style={{backgroundColor: '#f9f9f9'}} alt=""></img>
				</div>
			</div>
			<div className="col">
				<div className="card-block px-2">
					<h2 className="card-title">About Us</h2>
					<p className="card-text">Infuse your life with action. Don't wait for it to happen. Make it happen. Make your own future.</p>
				</div>
			</div>
		</div>

	</div>
);



export default AboutUs; 