import React from 'react'; 
// import Button from '@material/react-button/dist'; // /index.js is implied
import './ButtonPrimary.css';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
	ButtonPrimary: { 
		background: 'linear-gradient(to right, #2B89FE, #6834FF)',
		color: '#f9f9f9', 
	}
};

class ButtonPrimary extends React.Component {
	render () {
		return (

			// <a href={this.props.linkUrl}>
			<Button raised className={this.props.classes.ButtonPrimary} onClick={this.props.handleClick}>
				{this.props.children}
			</Button>
			// </a>
		);

			// <Button raised className='button-alternate button-primary-style' onClick={this.props.handleClick}>
			// 	{this.props.children}
			// </Button>
		)

	}

}

export default withStyles(styles)(ButtonPrimary); 