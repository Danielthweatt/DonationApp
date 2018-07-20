import React from 'react'; 
import Button from '@material/react-button/dist'; // /index.js is implied

const DonationButton = () => (
	<div className = "donation-button">
<<<<<<< HEAD
		{/* <a class="btn btn-primary" href="#" role="button">Link</a> */}
		<Button raised className='button-alternate'onClick={() => console.log('clicked!')}>Link</Button>
=======
		<a className="btn btn-primary" href="#" role="button">Link</a>
>>>>>>> bfc1ff70fd8ec4a2419306f8c5581228ebc274a0
	</div>

);

export default DonationButton; 