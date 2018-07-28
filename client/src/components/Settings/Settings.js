import React, { Component } from 'react';
import API from '../../utils/API';
import Input from '../Input'; 
import { Redirect } from 'react-router-dom'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import ButtonPrimary from '../Buttons/ButtonPrimary'


class Settings extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: false,
        messageContent: '',
        userId: ''
    };

    componentDidMount = () => {
        this.setState({
            userId: this.props.userInfo.userId,
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName,
            email: this.props.userInfo.email
        });
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

    handlePasswordInput = e => {
		this.setState({password: e.target.value});
	}

	handlePasswordConfirmInput = e => {
		this.setState({confirmPassword: e.target.value});
	}
    
    updateUserInfo = event => {
        event.preventDefault();
		this.setState({
			message: false,
			messageContent: ''
		});
		if (!this.state.firstName) {
			this.setState({
				message: true,
				messageContent: 'Please enter your first name.'
			});
		} else if (!this.state.lastName) {
			this.setState({
				message: true,
				messageContent: 'Please enter your last name.'
			});
		} else if (!this.state.email) {
			this.setState({
				message: true,
				messageContent: 'Please enter your email.'
			});
		} else {
            API.updateUserInfo(this.state.userId, this.state.firstName, this.state.lastName, this.state.email).then(res => {
			    if (res.status === 200) { 
				    this.setState({
					    message: true,
					    messageContent: 'User information updated.'
                    });
                    this.props.updateUser({
                       firstName: res.data.firstName,
                       lastName: res.data.lastName,
                       email: res.data.email 
                    });
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
        }
    }

    updateUserPassword = event => {
        event.preventDefault();
		this.setState({
			message: false,
			messageContent: ''
		});
        if (!this.state.password) {
			this.setState({
				message: true,
				messageContent: 'Please enter a password.'
            });
        } else if (this.state.password.indexOf('$') !== -1) {
            this.setState({
				message: true,
				messageContent: 'Passwords cannot contain a $ symbol.'
            });
		} else if (this.state.password !== this.state.confirmPassword) {
			this.setState({
				message: true,
				messageContent: 'Please re-enter a matching password.'
			});
		} else {
            API.updateUserPassword(this.state.userId, this.state.password).then(res => {
				if (res.status === 200) { 
				    this.setState({
					    message: true,
					    messageContent: 'Password updated.'
                    });
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
        }
    }

    onToken = token => {
        API.updateUserPaymentInfo(this.state.userId, this.state.email, token.id).then(res => {
            if (res.status === 200) { 
                this.setState({
                    message: true,
                    messageContent: 'Payment information updated.'
                });
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
    }

    deletePaymentInfo = () => {
        API.deleteUserPaymentInfo(this.state.userId).then(res => {
            if (res.status === 200) { 
                this.setState({
                    message: true,
                    messageContent: 'Payment information deleted.'
                });
                this.props.updateUser({
                    hasCustomerAccount: false,
                    hasSubscription: false
                });
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
    }
    
    render() {
        if (!this.props.userInfo.loggedIn) {
            return <Redirect to={{ pathname: '/' }} />
        } else {
            return (
                <div>
                    
                    <h4>User Information:</h4>
                    <form>
                        <Input 
                            title="First Name" 
                            name="First Name" 
                            type="text" 
                            value={this.state.firstName} 
                            handleInput={this.handleFirstNameInput} 
                        />

                        <Input 
                            title="Last Name" 
                            name="Last Name" 
                            type="text" 
                            value={this.state.lastName} 
                            handleInput={this.handleLastNameInput} 
                        />

                        <Input 
                            title="Email" 
                            name="Email" 
                            type="text" 
                            value={this.state.email} 
                            handleInput={this.handleEmailInput} 
                        />

                        <ButtonPrimary handleClick={this.updateUserInfo}>Update</ButtonPrimary>
                    </form>
                    <br/><br/>

                    <h4>Update Password:</h4>
                    <form>

                        <Input 
                            title="New Password" 
                            name="New Password" 
                            type="password" 
                            value={this.state.password} 
                            handleInput={this.handlePasswordInput} 
                        />

                        <Input 
                            title="Confirm Password" 
                            name="Confirm Password" 
                            type="password" 
                            value={this.state.confirmPassword} 
                            handleInput={this.handlePasswordConfirmInput} 
                        />

                        <ButtonPrimary handleClick={this.updateUserPassword}>Update</ButtonPrimary>
                    </form>
                    <br/><br/>

                    <h4>Update Payment Information:</h4>

                    {/*replace with your public key*/}
                    <StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
                        <Elements>
                            <StripeCheckout
                                email={this.state.email}
                                label ="Update Payment Information"
                                token={this.onToken}
                                //replace with your public key
                                stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
                                allowRememberMe = {false}
                            />
                        </Elements>
                    </StripeProvider>
                    <br/><br/>
                    <ButtonPrimary handleClick={this.deletePaymentInfo}>
                        Delete My Payment Information
                    </ButtonPrimary>

                    {this.state.message ? (
					    <p>{this.state.messageContent}</p>
				    ) : (
					    <div></div>
				    )}
                </div>
            )
        }
    }
}

export default Settings;