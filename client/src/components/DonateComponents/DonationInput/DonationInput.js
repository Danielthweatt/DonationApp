import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import Donate from '../Donate/Donate'; 
import DonateOptions from '../DonateOptions'; 
import CBox from "../Checkbox";
import './DonationInput.css'; 
import DonationModal from "../DonationModal";

class DonationInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			amount: '',
			customAmount: '',
			custom: false,
			rememberMe: false, 
			buttonClicked: 0,
			subscriptionStarted: false,
			message: false,
			messageContent: '',
		};

		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handleMoneyButton = this.handleMoneyButton.bind(this);
		this.handleMoneyCustom = this.handleMoneyCustom.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleSubscribe = this.handleSubscribe.bind(this);
		this.chargeACustomer = this.chargeACustomer.bind(this);
		this.onToken = this.onToken.bind(this);
	}
	
	handleFirstNameInput = e => {
		this.setState({firstName: e.target.value});
	}

	handleLastNameInput = e => {
		this.setState({lastName: e.target.value});
	}

	handleEmailInput = e => {
		this.setState({email: e.target.value});
	}

	handleMoneyButton = e => {
		this.setState({
			customAmount: '',
			amount: e.currentTarget.value,
			custom: false,
			buttonClicked: e.currentTarget.value
		});
	}
	
	handleMoneyCustomButton = e => {
		this.setState({
			customAmount: e.currentTarget.value,
			amount: '',
			custom: true,
			buttonClicked: e.currentTarget.value
		});
	}

	handleMoneyCustom = e => {
		this.setState({
			customAmount: e.target.value
		});
  	}

	checkMoneyInput = () => {

		
		const regex = /^\d+(?:\.\d{0,2})$/;
		console.log('testies', this.state.amount)

		if (!regex.test(this.state.amount))
			console.log("Invalid Number");
			
	}

	handleCheckbox = () => {
		this.setState({rememberMe: !this.State.rememberMe})
	}

	handleSubscribe = () => {
		this.setState({subscriptionStarted: !this.state.subscriptionStarted})
	}

	chargeACustomer() {
		//charge the customer instead of the card
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		axios.post('/charge/' + userId, {
			amount
		}).then(res => {
			if (res.status === 200) { 
				this.setState({
					message: true,
					messageContent: 'Donation complete.'
				});
				this.props.handleModalOpen();
			} else {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				this.props.handleErrorOpen();
			}
		}).catch(err => {
			console.log(err);
			this.setState({
				message: true,
				messageContent: 'Something went wrong.'
			});
			this.props.handleErrorOpen();
		});
	}

	onToken = (token) => {
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		if (this.props.userInfo.loggedIn && this.state.rememberMe && !this.state.handleSubscribe) {
			axios.post('/charge/create/' + userId, {
				email: this.props.userInfo.email,
				source: token.id,
				amount,
				stripeKey: "pk_test_laDoJCqgOQpou2PvCdG07DE2"
			}).then(res => {
				if (res.status === 200) {
					this.setState({
						rememberMe: false,
						message: true,
						messageContent: 'Donation complete and payment information saved. To update or delete payment information, see settings page.'
					});
					this.props.updateUser({
						hasCustomerAccount: true
					});
					this.props.handleModalOpen();
				} else {
					this.setState({
						message: true,
						messageContent: 'Something went wrong.'
					});
					this.props.handleErrorOpen();
				}
			}).catch(err => {
				console.log(err);
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				this.props.handleErrorOpen();
			});
		} else if (this.props.userInfo.loggedIn && this.state.subscriptionStarted){
			console.log('subscribe!!!');
			//post route to start subscription
			axios.post('/charge/subscription/' + userId, {
				email: this.props.userInfo.email,
				source: token.id,
				amount,
				stripeKey: "pk_test_laDoJCqgOQpou2PvCdG07DE2"
		}).then(res => {
			if (res.status === 200) {
				alert('subscription saved!');
			} else {
				alert('Something went wrong.');
			}})

		} else {
			axios.post('/charge', {
				email: this.state.email,
				source: token.id,
				amount
        	}).then(res => {
				if (res.status === 200) {
					this.setState({
						firstName: '',
						lastName: '',
						email: '',
						rememberMe: false,
						message: true,
						messageContent: 'Donation complete.'
					});
					this.props.handleModalOpen();
				} else {
					this.setState({
						message: true,
						messageContent: 'Something went wrong.'
					});
					this.props.handleErrorOpen();
				}
        	}).catch((err) => {
				console.log(err);
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				this.props.handleErrorOpen();
			});
		}
	}
	
	render() {
		return (
			<div className = "donation-input-card">
				<center>
					<h2>Donate</h2>
					<hr/>
				</center>
				<DonateOptions
					buttonClicked={this.state.buttonClicked}
					handleMoneyButton={this.handleMoneyButton}
					handleMoneyCustomButton={this.handleMoneyCustomButton}
					customAmount={this.state.customAmount}
					custom={this.state.custom}
					checkMoneyInput={this.checkMoneyInput}
				/>

				{this.state.custom ? (
					<div>
						<Input 
							title="Amount"
							name="Amount"
							id="custom-payment" 
							handleInput={this.handleMoneyCustom} 
							onBlur={this.state.checkMoneyInput}
							value={this.state.customAmount} 
							type="number" 
							step="0.01" 
							min="0.01" 
							type={Donate}/>
					</div>
				) : (
					<div></div>
				)}

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "First Name"
						name = "First Name"
						type="text"
						value={this.state.firstName}
						handleInput={this.handleFirstNameInput}
					/>
				)}

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "Last Name"
						name = "Last Name"
						type="text"
						value={this.state.lastName}
						handleInput={this.handleLastNameInput}
					/>
				)}

				{this.props.userInfo.loggedIn ? (
					<div></div>
				) : (
					<Input 
						title = "Email"
						name = "Email"
						type="text"
						value={this.state.email}
						handleInput={this.handleEmailInput}
					/>
				)}

				{this.props.userInfo.loggedIn && !this.props.userInfo.hasCustomerAccount ? (
					<CBox
						handleCheckbox = {this.handleCheckbox}
						handleSubscribe = {this.handleSubscribe}
					/>
				) : (
					<div></div>
				)}
			
				{this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount ? (
					<button onClick={this.chargeACustomer}>Donate</button>
				) : (
					<StripeProvider apiKey="pk_test_laDoJCqgOQpou2PvCdG07DE2">
						<Elements>
						<StripeCheckout
							allowRememberMe = {false}
							name={this.props.userInfo.loggedIn ? (
								`${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`
							) : (
								`${this.state.firstName} ${this.state.lastName}`
							)}
							email={this.props.userInfo.loggedIn ? (
								this.props.userInfo.email	
							) : (	
								this.state.email
							)}
							amount={this.state.amount ? (
								this.state.amount * 100
							) : (
								this.state.customAmount * 100
							)}
							token={this.onToken}
							stripeKey={'pk_test_laDoJCqgOQpou2PvCdG07DE2'}
					
						/>
						</Elements>
					</StripeProvider>
				)}

				{this.state.message ? (
					<p>{this.state.messageContent}</p>
				) : (
					<div></div>
				)}

			</div>
		)
	}
};

export default DonationInput;