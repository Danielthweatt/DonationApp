import React from 'react';
// import Button from '@material/react-button/dist'; // /index.js is implied
import './Jumbotron.css';

class Jumbotron extends React.Component {
    render () {
        return (
            <div className="jumbotron jumbotron-fluid" style={{zIndex: -1}}>
                {/* This empty div for color gradient overlay on top of image */}
                <div className="color-overlay"></div>
                <div className="inner">
                    <center>
                        <h1 className="display-4">Love Foundation</h1>
                        <p className="lead">Making sure the Earth exists for the next generation.</p>
                    </center>
                </div>
                {/* <hr className="my-4"></hr>
                <p className="lead">
                    <Button raised className='button-alternate' onClick={() => console.log('clicked!')}>
                        Learn more
                    </Button>
                </p> */}
			</div>
		);
	}
}

export default Jumbotron;