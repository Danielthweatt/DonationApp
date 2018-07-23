import React, { Component } from 'react';
import axios from 'axios';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';

class Settings extends Component {
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            customerId: "",
            userId: "",
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

    //update card info
    onToken = (token) => {
        axios.put('/settings/' + this.state.userId,{
            email: this.state.email,
            data: token.id,
            stripeKey: "pk_test_xwATFGfvWsyNnp1dDh2MOk8I"
        }).then(res => {
            console.log(res)
            this.setState({
                message: 'Congratulations, your default payment method was updated.'
            })
            }).catch(err => {
            console.log(err)
                this.setState({
                    message: 'Uh oh.. something has gone awry'
                })
            })
    }

    //delete customers info
    deleteCustomer(){
        //console.log(this.state)
        axios.put('/settings/delete/' + this.state.userId, {})
        .then(res => {
            console.log(res)
            window.location.reload();
        })
    }
    
    render() {
        console.log(this.props.userInfo)
        return (
            <div>
            <h1>the settings</h1>
            <form>
                <label>
                    First Name:
                    <input type="text" name="firstName" placeholder={this.state.firstName} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" placeholder={this.state.lastName} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" placeholder={this.state.email}/>
                </label>
            <button>Update</button>
            </form>

                <StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
                    <Elements>
                        <StripeCheckout
                            email={this.state.email}
                            label ="Update Info"
                            token={this.onToken}
                            stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
                            allowRememberMe = {false}
                        />
                    </Elements>
                </StripeProvider>

                <button onClick={this.deleteCustomer}>
                    Delete My Payment Info
                </button>

                {this.state.message ? (
                    <h4>{this.state.message}</h4>
                ) : (
                    <div/>
                )}
            </div>
        )
    }
}

export default Settings;