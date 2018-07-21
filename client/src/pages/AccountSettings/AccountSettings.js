import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 
import Settings from '../../components/Settings';

class AccountSettings extends Component {
    render() {
        return (
            <Wrapper>
                <Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
                <Settings userInfo={this.props.userInfo}/>
                <Footer />
            </Wrapper>
        )
    }
}

export default AccountSettings;
