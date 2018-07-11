import React, { Component } from 'react';
import 'whatwg-fetch';
import InputKeyValue from './inputKeyValue';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setupBegan: false,
      isLoading: true,
      error: null,
      account: null,
      fieldsNeededForm: {},
    };

    // binding function to component
    this.fetchAccount = this.fetchAccount.bind(this);
    this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
    this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.fieldsNeededFormChange = this.fieldsNeededFormChange.bind(this);
    this.onClickSaveFieldsNeeded = this.onClickSaveFieldsNeeded.bind(this);
  }

  componentWillMount() {
    this.fetchAccount();
  }

  getFieldValue(key) {
    const {
      fieldsNeededForm
    } = this.state;

    if (fieldsNeededForm[key]) {
      return fieldsNeededForm[key];
    } else {
      return '';
    }
  }

  fieldsNeededFormChange(e, key) {
    const {
      fieldsNeededForm
    } = this.state;

      fieldsNeededForm[key] = e.target.value;

      this.setState({
        fieldsNeededForm,
      })

    }

  fetchAccount() {
    fetch('/api/stripe/account/get', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        const { success, message, setupBegan, account } = json;

        if (success) {
          this.setState({
            setupBegan,
            isLoading: false,
            account,
          });
        } else {
          // failed
          this.setState({
            error: message,
            isLoading: false
          });
        }
      });
  }

  onStartAccountSetup() {
    this.setState({
      isLoading: true
    });
    fetch('/api/stripe/account/setup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        countryCode: 'US'
      })
    })
      .then(res => res.json())
      .then(json => {
        const { success, message } = json;

        if (success) {
          this.fetchAccount();
        } else {
          // failed
          this.setState({
            error: message,
            isLoading: false
          });
        }
      });
  }

  onClickBeginSetup() {
    console.log('onClickBeginSetup');
    this.onStartAccountSetup();
  }

  onClickSaveFieldsNeeded() {
    console.log('onClickSaveFieldsNeeded');
    const {
      fieldsNeededForm,
    } = this.state;
    this.setState({
      isLoading: true
    });
    fetch('/api/stripe/account/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fieldsNeededForm)
    })
      .then(res => res.json())
      .then(json => {
        const { success, message } = json;

        if (success) {
          this.fetchAccount();
        } else {
          // failed
          this.setState({
            error: message,
            isLoading: false
          });
        }
      });
  }
  render() {
    const { 
      isLoading, 
      setupBegan, 
      error, 
      account,
     } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!setupBegan) {
      return (
        <div>
          {error ? <p>(error)</p> : null}
          <button onClick={this.onClickBeginSetup}>Begin setup</button>
          <p> By clicking setup you are agree to the TOS for Stripe.</p>
        </div>
      );
    }

    console.log('account', account);

    const { verification } = account;
    const { fields_needed } = verification;

    return (
      <div>
        {error ? <p>(error)</p> : null}
        {fields_needed.length === 0 ? (
          <p> All setup</p>
        ) : (
          <div>
            {
            fields_needed.map(fieldKey => {
              return (
                <InputKeyValue
                text={fieldKey}
                id={fieldKey}
                value={this.getFieldValue(fieldKey)}
                key={Math.random()}
                onTextboxChange={this.fieldsNeededFormChange}
                />
              );
            })
          }
          <div>
            <button onClick={this.onClickSaveFieldsNeeded}>Save</button>
            </div>
            </div>

          )
        }
      </div>
    );
  }
}

export default Home;
