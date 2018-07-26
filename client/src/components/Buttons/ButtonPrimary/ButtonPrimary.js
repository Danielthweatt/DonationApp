import React from 'react'; 
import Button from '@material/react-button/dist'; // /index.js is implied
import './ButtonPrimary.css'

class ButtonPrimary extends React.Component {
	render () {
		return (
			// <a href={this.props.linkUrl}>
				<Button raised className='button-alternate button-primary-style' onClick={this.props.handleClick}>
					{this.props.children}
				</Button>
			// </a>
		)
	}

};

export default ButtonPrimary; 