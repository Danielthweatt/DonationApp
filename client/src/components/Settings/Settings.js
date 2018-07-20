import React, { Component } from 'react';
import axios from 'axios';

class Settings extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        cardOnFile: false,
        donationHistory: []
    }
    
    render() {
        console.log(this.props.userInfo)
        
        return (
            <h1>the settings</h1>
        )
    }
}

export default Settings;