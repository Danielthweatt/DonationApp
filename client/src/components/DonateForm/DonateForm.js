import React, {Component} from 'react';
import './DonateForm.css';
//cardelement creates a "card-type" element that displays on page - includes inputs for cc info
//injectStripe will wrap the component
import {CardElement, injectStripe} from 'react-stripe-elements';

class DonateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {complete: false};
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		this.setState({complete: false});
	}
	//where u put the method to tokenize card data
	async submit(e) {
		let {token} = await this.props.stripe.createToken({name: 'Name'});
		let response = await fetch('/charge', {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: token.id
		});

		if(response.ok) this.setState({complete: true});
	}

	render() {
		if (this.state.complete) return <h1>Purchase COMPLETE!</h1>;
        
		return (
			<div className="checkout">
				<div className="input-group-prepend">   
					<span className="input-group-text">Credit Card</span>
				</div>
				<CardElement />
				<button onClick={this.submit}>Send</button>   
			</div>    
		);
	}
}

export default injectStripe(DonateForm);