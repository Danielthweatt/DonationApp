import React from 'react'; 
import './AboutUs.css'; 

const AboutUs = () => (
	<div className="card" id="about">
		<div className="row no-gutters">
			<div className="col-auto">
				<div className="about-logo-img-styling">
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpq5dUAQ7RFh1JQISWijgyZ5UKRnIkbm3ZxY_ZVsI1cEwMCzgaDQ" className="img-fluid" alt=""></img>
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