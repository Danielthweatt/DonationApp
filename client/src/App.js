import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DonateForm from "./components/DonateForm"
import './App.css';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <DonateForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
