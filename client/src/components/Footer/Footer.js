import React from 'react'; 
import '../Footer/Footer.css';
import {Link} from 'react-router-dom';


const Footer = () => (

		<footer id="myFooter">
			<div className="container">
				<div className="row">
					<div className="col-12 col-lg-8">
						<div className="footer-text">
							© The Love Foundation, Inc.  All Rights Reserved.  123 Main St. Anywhere, MN | 55317 |123-456-7890
						</div>
					</div>
					<div className="col-12 col-lg-4">
						<div className="social-icons">
							<Link to="#" className="fa fa-facebook"></Link>
							<Link to="#" className="fa fa-youtube"></Link>
							<Link to="#" className="fa fa-instagram"></Link>
							<Link to="#" className="fa fa-linkedin"></Link>

						</div>
					</div>
					
				</div>
					

			</div>
		</footer>

	
);

export default Footer; 