import React, { Component } from 'react';
import API from '../../../utils/API';
import Input from '../../Input'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import Donate from '../Donate/Donate'; 
import DonateOptions from '../DonateOptions'; 
import Checkbox from "../Checkbox";
import './DonationInput.css';

class DonationInput extends Component {
	state = {
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
		messageContent: ''
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

	chargeSavedUser = () => {
		let userId = this.props.userInfo.userId;
		let amount;
		if (this.state.amount) {
			amount = this.state.amount;
		} else {
			amount = this.state.customAmount;
		}
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
			console.log(err);
			this.setState({
				message: true,
				messageContent: 'Something went wrong.'
			});
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
			API.chargeAndSaveAUser(userId, this.props.userInfo.email, token.id, amount, "pk_test_laDoJCqgOQpou2PvCdG07DE2").then(res => {
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
				}
			}).catch(err => {
				console.log(err);
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
			});
		} else if (this.props.userInfo.loggedIn && this.state.subscriptionStarted){
			API.startASubscription(userId, this.props.userInfo.email, token.id, amount, "pk_test_laDoJCqgOQpou2PvCdG07DE2").then(res => {
				if (res.status === 200) {
					alert('subscription saved!');
				} else {
					alert('Something went wrong.');
				}
			});
		} else {
			API.charge(this.state.email, token.id, amount).then(res => {
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
				}
        	}).catch((err) => {
				console.log(err);
				this.setState({
					message: true,
					messageContent: 'Something went wrong.'
				});
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
					<Checkbox
						handleCheckbox = {this.handleCheckbox}
						handleSubscribe = {this.handleSubscribe}
					/>
				) : (
					<div></div>
				)}
			
				{this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount ? (
					<button onClick={this.chargeSavedUser}>Donate</button>
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
							token={this.state.amount || this.state.customAmout ? (
								this.onToken
							): (
								this.setState({
									message: true,
									messageContent: 'Select or enter an amount to donate.'
								})
							)}
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