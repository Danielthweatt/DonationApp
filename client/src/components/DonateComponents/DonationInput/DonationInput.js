import React, { Component } from 'react';
import API from '../../../utils/API';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import Donate from '../Donate/Donate'; 
import DonateOptions from '../DonateOptions'; 
import CBox from "../Checkbox";
import './DonationInput.css';
import ButtonPrimary from '../../Buttons/ButtonPrimary'


class DonationInput extends Component {
	state = {
		firstName: null,
		lastName: null,
		email: null,
		amount: 0,
		customAmount: 0,
		custom: false,
		rememberMe: false, 
		buttonClicked: 0,
		subscriptionStarted: false,
		message: false,
		messageContent: null
	};
	
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
			customAmount: 0,
			amount: e.currentTarget.value,
			custom: false,
			buttonClicked: e.currentTarget.value
		});
	}
	
	handleMoneyCustomButton = e => {
		this.setState({
			customAmount: e.currentTarget.value,
			amount: 0,
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
		// To be completed...
		const regex = /^\d+(?:\.\d{0,2})$/;
		console.log('testies', this.state.amount)
		if (!regex.test(this.state.amount)) console.log("Invalid Number");
	}

	handleCheckbox = () => {
		this.setState((prevState) => ({
			rememberMe: !prevState.rememberMe
		}));
	}

	handleSubscribe = () => {
		this.setState((prevState) => ({
			subscriptionStarted: !prevState.subscriptionStarted
		}));
	}

	chargeSavedUser = () => {
		this.setState({
			message: false,
			messageContent: ''
		});
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		if (amount && !this.state.subscriptionStarted) {
			API.chargeSavedUser(userId, amount).then(res => {
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
				}
			}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				console.log('Something went wrong: ');
				console.log(err);
			});
		} else if (amount && this.state.subscriptionStarted) {
			API.startASubscription(userId, amount).then(res => {
				if (res.status === 200) {
					this.setState({
						rememberMe: false,
						message: true,
						messageContent: 'This donation is complete and will automatically be repeated monthly.'
					});
					this.props.updateUser({
						hasSubscription: true
					});
					this.props.handleModalOpen();
				} else {
					this.setState({
						message: true,
						messageContent: 'Something went wrong.'
					});
				}
			}).catch(err => {
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				this.props.handleErrorOpen();
			});
		} else {
			this.setState({
				message: true,
				messageContent: 'Please enter an amount to donate.'
			});
			this.props.handleErrorOpen();
		};
	}

	onToken = (token) => {
		this.setState({
			message: false,
			messageContent: ''
		});
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
		if (this.props.userInfo.loggedIn && this.state.rememberMe && amount) {
			API.chargeAndSaveAUser(userId, this.props.userInfo.email, token.id, amount).then(res => {
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
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				console.log('Something went wrong: ');
				console.log(err);
			});
		} else if (amount) {
			let email;
			if (this.props.userInfo.loggedIn) {
				email = this.props.userInfo.email;
			} else {
				email = this.state.email;
			}
			API.charge(email, token.id, amount).then(res => {
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
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
				this.props.handleErrorOpen();
				console.log('Something went wrong: ');
				console.log(err);
			});
		} else {
			this.setState({
				message: true,
				messageContent: 'Please enter an amount to donate.'
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
					null
				)}

				{this.props.userInfo.loggedIn ? (
					null
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
					null
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
					null
				) : (
					<Input 
						title = "Email"
						name = "Email"
						type="text"
						value={this.state.email}
						handleInput={this.handleEmailInput}
					/>
				)}

				{this.props.userInfo.loggedIn ? (
					<CBox
						hasCustomerAccount = {this.props.userInfo.hasCustomerAccount}
						hasSubscription = {this.props.userInfo.hasSubscription}
						handleCheckbox = {this.handleCheckbox}
						handleSubscribe = {this.handleSubscribe}
					/>
				) : (
					null
				)}
			
				{this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount ? (
					<ButtonPrimary handleClick={this.chargeSavedUser}>Donate</ButtonPrimary>
				) : (
					//replace apiKey with your public key
					<StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
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
							//replace stripeKey with your public key
							stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
					
						>
							<ButtonPrimary>Pay With Card</ButtonPrimary>
						</StripeCheckout>
						</Elements>
					</StripeProvider>
				)}

				{this.state.message ? (
					<p>{this.state.messageContent}</p>
				) : (
					null
				)}

			</div>
		)
	}
};

export default DonationInput;