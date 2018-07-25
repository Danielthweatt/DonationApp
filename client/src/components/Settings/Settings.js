import React, { Component } from 'react';
import axios from 'axios';
import Input from '../Input'; 
import { Redirect } from 'react-router-dom'; 
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';

class Settings extends Component {
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: '',
            confirmPassword: '',
            message: false,
            messageContent: '',
            customerId: "",
            userId: ""
        };
        this.deleteCustomer = this.deleteCustomer.bind(this);
}

    componentDidMount(){
        this.setState({
            userId: this.props.userInfo.userId,
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName,
            email: this.props.userInfo.email,
        })
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
            axios.put('/user/update/' + this.state.userId, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            }).then(res => {
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
			    console.log(err);
			    this.setState({
				    message: true,
				    messageContent: 'Something went wrong.'
			    });
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
            axios.put('/user/update/' + this.state.userId, {
				password: this.state.password
			}).then(res => {
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

    //update card info
    onToken = (token) => {
        axios.put('/settings/' + this.state.userId,{
            email: this.state.email,
            data: token.id,
            stripeKey: "pk_test_laDoJCqgOQpou2PvCdG07DE2"
        }).then(res => {
            console.log(res)
            this.setState({
                message: true,
                messageContent: 'Congratulations, your default payment method was updated.'
            })
            }).catch(err => {
            console.log(err)
                this.setState({
                    message: true,
                    messageContent: 'Uh oh.. something has gone awry'
                })
            })
    }

    //delete customers info
    deleteCustomer(){
        //console.log(this.state)
        axios.put('/settings/delete/' + this.state.userId, {})
        .then(res => {
            console.log(res)
            this.props.updateUser({
                hasCustomerAccount: false
            });
        })
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

                        <button onClick={this.updateUserInfo}>Update</button>
                    </form>

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

                        <button onClick={this.updateUserPassword}>Update</button>
                    </form>

                    <StripeProvider apiKey="pk_test_laDoJCqgOQpou2PvCdG07DE2">
                        <Elements>
                            <StripeCheckout
                                email={this.state.email}
                                label ="Update Info"
                                token={this.onToken}
                                stripeKey={'pk_test_laDoJCqgOQpou2PvCdG07DE2'}
                                allowRememberMe = {false}
                            />
                        </Elements>
                    </StripeProvider>

                    <button onClick={this.deleteCustomer}>
                        Delete My Payment Information
                    </button>

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