import React from 'react'; 
import '../Footer/Footer.css';
import Wrapper from '../Wrapper/Wrapper'; 

const Footer = () => (

		<footer id="myFooter">
			<div className="container">
				<div className="row">
					<div className="col-sm-4">
						<h5>Get started</h5>
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">About</a></li>
							<li><a href="#">Donations</a></li>
						</ul>
					</div>
				</div>
					
				<div className="footer-copyright">
					<p>© 2018 Copyright Text </p>
				</div>
			</div>
		</footer>

	
);

export default Footer; 