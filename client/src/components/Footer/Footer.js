import React from 'react'; 
import '../Footer/Footer.css';
import Wrapper from '../Wrapper/Wrapper'; 


const Footer = () => (
	
	<div className="content">
		{/* <Wrapper> */}
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
							<a href="#" className="fa fa-facebook"></a>
							<a href="#" className="fa fa-youtube"></a>
							<a href="#" className="fa fa-instagram"></a>
							<a href="#" className="fa fa-linkedin"></a>

						</div>
					</div>
					
				</div>
					

			</div>
		</footer>
		{/* </Wrapper> */}
	</div>
	
);

export default Footer; 