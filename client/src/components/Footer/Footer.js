import React from 'react'; 
import '../Footer/Footer.css';

const Footer = () => (

	<div className="content">

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
					<div className="col-sm-4">
						<h5>About us</h5>
						<ul>
							<li><a href="#">Do we want this?</a></li>
							<li><a href="#">Do we have stuff to fill in here?</a></li>
							<li><a href="#">Or is it too much?</a></li>
						</ul>
					</div>
					<div className="col-sm-4">
						<h5>Legal</h5>
						<ul>
							<li><a href="#">Terms of Service</a></li>
							<li><a href="#">Terms of Use</a></li>
							<li><a href="#">Privacy Policy</a></li>
						</ul>
					</div>
				</div>
				{/* <!-- Here we use the Google Embed API to show Google Maps. -->
            <!-- In order for this to work in your project you will need to generate a unique API key.  --> */}
				<iframe id="map-container" frameBorder="0" 
					src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJOwg_06VPwokRYv534QaPC8g&key=AIzaSyD1wrM6f549kkBmfxVp4t8CvIiL4Vs2UUY" >
				</iframe>
			</div>
			<div className="social-networks">
				<a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
				<a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
				<a href="#" className="google"><i className="fa fa-google-plus"></i></a>
			</div>
			<div className="footer-copyright">
				<p>© 2018 Copyright Text </p>
			</div>
		</footer>
	</div>
);

export default Footer; 