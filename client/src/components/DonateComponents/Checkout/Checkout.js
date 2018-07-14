import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


export default class Checkout extends React.Component {


    onToken = (token) => {
        axios.post('/charge', {
            description: 'example charge',
            source: token.id,
        }).then((data) => {
            console.log(data.status)
            if (data.status === 200){
                alert('it worked!')
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    render() {
        return(
            <StripeCheckout
            name={this.props.name}
            email={this.props.email}
            token={this.onToken}
            stripeKey={'pk_test_xwATFGfvWsyNnp1dDh2MOk8I'}
            />
        )
    }
}