import React from 'react'; 
import Button from '@material/react-button/dist'; // /index.js is implied

const DonationButton = () => (
	<div className = "donation-button">
		{/* <a class="btn btn-primary" href="#" role="button">Link</a> */}
		<Button raised className='button-alternate'onClick={() => console.log('clicked!')}>Link</Button>
		<a className="btn btn-primary" href="#" role="button">Link</a>
	</div>

);

export default DonationButton; 