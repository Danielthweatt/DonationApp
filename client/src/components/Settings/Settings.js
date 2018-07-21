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

    updateCardInfo(){
        //delete customer from stripe and then make a new customer
        //BUT save their info for later (no charge at this moment)
        if (this.props.userInfo.loggedIn && this.props.userInfo.hasCustomerAccount){
            console.log(this.props.userInfo.userId)
            axios.get('/settings/' + this.props.userInfo.userId,{
            }).then(res => {
                console.log(res)
            })
        }
        else{
            alert('u have not saved any cc info')
        }
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
                <label>
                    cc:
                    <input type="text" name="ccInfo" placeholder=" xxxx xxxx xxxx xxxx" />
                </label>
                <button onClick={this.updateCardInfo()}>change my info</button>

            </form>
            </div>
        )
    }
}

export default Settings;