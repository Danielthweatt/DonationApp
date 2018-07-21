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

    componentDidMount(){
        this.updateCardInfo();
    }

    updateCardInfo(){
        //delete customer from stripe and then make a new customer
        //BUT save their info for later (no charge at this moment)
        if (this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount){
            console.log(this.props.userInfo.mongoId)
        }
        else{
            console.log('stoopid')
        }
    }
    
    render() {
        
        console.log(this.props.userInfo)
        return (
            <div>
            <h1>the settings</h1>
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" placeholder="fdjask"/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="text" name="email" placeholder={this.props.userInfo.email} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Settings;