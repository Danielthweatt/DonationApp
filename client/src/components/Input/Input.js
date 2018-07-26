import React from 'react';
// If I use this I can reference this link: https://react-mdc.github.io/#/textfield
// import TextField, {HelperText, Input} from '@material/react-text-field';
// Need to get with backend fools to see if this is possible for their inputs
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	defaultInputStyle: {
		backgroundColor: 'transparent',
		margin: '.7em auto',
	},
	cssUnderline: {
		'&:after': {
			borderBottomColor: '#FFB50F',
	},
	cssLabel: {
		'&$cssFocused': {
			color: '#FFB50F',
		},
	},
	cssFocused: {},
	}

};
class Input extends React.Component {

	render () {
		return (
			// <div className="input-group">
			// 	<div className="input-group-prepend"> 
			// 		<span className="input-group-text">{props.title}</span>
			// 	</div>
			// 	below is how we get the material design to work for the text areas
			// 	will need to change what it is referencing, since "Input is in all their .js in DonationInput"
			// 	<TextField.Input name=
				<TextField  
					id="with-placeholder" 
					label={this.props.title} 
					placeholder={this.props.title} 
					name={this.props.name} 
					type={this.props.type} 
					value={this.props.value} 
					onChange={this.props.handleInput} 
					className={this.props.classes.defaultInputStyle + " form-control"} 
					aria-label="Input field" 
				/>
			// </div>
		)
	}
};

export default withStyles(styles)(Input); 