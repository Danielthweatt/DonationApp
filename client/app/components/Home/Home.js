import React, { Component } from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setupBegan: false,
      isLoadingFieldsNeeded: true,
      error: null
    };

    // binding function to component
    this.fetchFieldsNeeded= this.fetchFieldsNeeded.bind(this);
    this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
    this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
   
  }

  componentWillMount() {
    this.fetchFieldsNeeded();
  }

  fetchFieldsNeeded() {
    fetch('/api/stripe/account/get', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        const {
          success,
          message,
          setupBegan,
        } = json;

       if (success) {
          this.setState({
            setupBegan,
            isLoadingFieldsNeeded: false,
          });
       } else {
         // failed
         this.setState({
           error: message,
           isLoadingFieldsNeeded: false,
         });
       }
      });
  }

  onStartAccountSetup() {
    this.setState({
      isLoadingFieldsNeeded: true,
    });
    fetch('/api/stripe/account/setup', { 
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: 'US'
      }),
     })
    .then(res => res.json())
    .then(json => {
      const {
        success,
        message,
      } = json;

     if (success) {
       this.fetchFieldsNeeded();
       
     } else {
       // failed
       this.setState({
         error: message,
         isLoadingFieldsNeeded: false,
       });
     }
    });

  }

  onClickBeginSetup() {
    console.log('onClickBeginSetup');
    this.onStartAccountSetup();
  }
  render() {
    const {
      isLoadingFieldsNeeded,
      setupBegan,
      error,
    } = this.state;
    if (isLoadingFieldsNeeded) {
      return (
        <p>Loading...</p>
      );
    }

    if (!setupBegan) {
      return (
        <div>
          {
            (error) ? (
              <p>(error)</p>
            ) : (null)
          }
          <button onClick={this.onClickBeginSetup}>
            Begin setup
            </button>
            <p> By clicking setup you are agree to the TOS for Stripe.</p>
          </div>
      )
    }

    return (
      <div>
        {
          (error) ? (
            <p>(error)</p>
          ) : (null)
        }
        <p> Start adding Stripe elements</p>
        </div>
    );
  }
}

export default Home;
