import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import Wrapper from '../../components/Wrapper/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 
import Settings from '../../components/Settings';

class AccountSettings extends Component {
	render() {
		return (
			<div>
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>
					<Settings userInfo={this.props.userInfo}/>
                   
				</Wrapper>
				<Footer />
			</div>
		);
	}
}

export default AccountSettings;
