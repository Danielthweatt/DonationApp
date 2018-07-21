import React, { Component } from 'react';
import axios from 'axios';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';

class Settings extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        cardOnFile: false,
        donationHistory: [],
        customerId: "",
        userId: "",
    }

    componentDidMount(){
        this.setState({userId: this.props.userInfo.userId})
    }

    onToken = (token) => {
        //delete customer from stripe and then make a new customer
        //this.deleteCustomer();
        axios.put('/settings/' + this.state.userId,{
            email: this.props.userInfo.email,
            data: token.id,
            stripeKey: "pk_test_xwATFGfvWsyNnp1dDh2MOk8I"
        }).then(res => {
            console.log(res)
            }).catch(err => {
            console.log(err)
                })
        //BUT save their info for later (no charge at this moment)
        //if (this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount){
            //console.log(this.props.userInfo.userId)
          
            // axios.post('/settings/create/' + this.state.userId, {
            //     email: this.props.userInfo.email,
            //     source: token.id,
            // }).then(results => {
            //     console.log(results)
            //     alert('customer saved')
            // })
        // }
        // else{
        //     alert('u have not saved any cc info')
        // }
    }
    
    render() {
        console.log(this.props.userInfo)
        return (
            <div>
            <h1>the settings</h1>
            <form>
                <label>
                    First Name:
                    <input type="text" name="firstName" placeholder={this.props.userInfo.firstName} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" placeholder={this.props.userInfo.lastName} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" placeholder={this.props.userInfo.email}/>
                </label>
            <button>Update</button>
            </form>

                <StripeProvider apiKey="pk_test_xwATFGfvWsyNnp1dDh2MOk8I">
                    <Elements>
                        <StripeCheckout
                            email={this.props.userInfo.email}
                            label ="Update Info"
                            token={this.onToken}
                            stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
                            allowRememberMe = {false}
                        />
                    </Elements>
                </StripeProvider>
           
            </div>
        )
    }
}

export default Settings;