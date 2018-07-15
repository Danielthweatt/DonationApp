import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import PropTypes from 'prop-types'

import BankAccountSection from './BankAccountSection';
import {
  BANK_ACCOUNT_FORM_COUNTRY,
  BANK_ACCOUNT_FORM_CURRENCY,
  BANK_ACCOUNT_FORM_ROUTING_NUMBER,
  BANK_ACCOUNT_FORM_ACCOUNT_NUMBER,
  BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME,
  BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE,
} from './BankAccountSection';

class BankAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryValue: '',
      currencyValue: '',
      routingNumberValue: '',
      accountNumberValue: '',
      accountHolderNameValue: '',
      accountHolderTypeValue: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTextboxChange = this.handleSubmit.bind(this);
  }
    handleSubmit(ev) {
   
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const {
      countryValue,
      currencyValue,
      routingNumberValue,
      accountNumberValue,
      accountHolderNameValue,
      accountHolderTypeValue,
    } = this.state;
    const {
      onSaveAccount,

    } = this.props;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken('bank_account', {
      country: countryValue,
      currency: currencyValue,
      routing_number: routingNumberValue,
      account_number: accountNumberValue,
      account_holder_name: accountHolderNameValue,
      account_holder_type: accountHolderTypeValue,
    }).then(({token}) => {
      console.log('Received Stripe token:', token);
      const {
        id,
      } = token;

      onSaveAccount(id);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

 
  onTextboxChange(e, textboxKey) {
    const value = e.target.value
    if (textboxKey === BANK_ACCOUNT_FORM_COUNTRY) {
      this.setState({
        countryValue: value
      });
    } else if (textboxKey === BANK_ACCOUNT_FORM_CURRENCY) {
      this.setState({
        currencyValue: value
      });
    }
    else if (textboxKey === BANK_ACCOUNT_FORM_ROUTING_NUMBER) {
      this.setState({
        routingNumberValue: value
      });
    }
    else if (textboxKey === BANK_ACCOUNT_FORM_ACCOUNT_NUMBER) {
      this.setState({
        accountNumberValue: value
      });
    }
    else if (textboxKey === BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME) {
      this.setState({
        accountHolderNameValue: value
      });
    }
    else if (textboxKey === BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE) {
      this.setState({
        accountHolderTypeValue: value
      });
    }
  }

 render() {
   const {
    countryValue,
    currencyValue,
    routingNumberValue,
    accountNumberValue,
    accountHolderNameValue,
    accountHolderTypeValue,
   } = this.state;
  return (
    <form onSubmit={this.handleSubmit}>
      <BankAccountSection 
        onChangeFunc={this.onTextboxChange}
        countryValue={countryValue}
        currencyValue={currencyValue}
        routingNumberValue={routingNumberValue}
        accountNumberValue={accountNumberValue}
        accountHolderNameValue={accountHolderNameValue}
        accountHolderTypeValue={accountHolderTypeValue}
        />
      <button>save Account</button>
    </form>
  );
 }
}

BankAccountForm.propTypes = {
  onSaveAccount: PropTypes.func.isRequired,
};

export default injectStripe(BankAccountForm);