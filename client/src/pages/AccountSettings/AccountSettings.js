import React,  { Component } from 'react'; 
import Header from '../../components/Header'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer'; 
import Settings from '../../components/Settings';

class AccountSettings extends Component {
	render() {
		return (
			<div>
				<div className="pageHeight">
					<Header page="settings" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<Wrapper>
						<Settings updateUser={this.props.updateUser} userInfo={this.props.userInfo}/>
					
					</Wrapper>
				</div>
				<Footer />
			</div>
		);
	}
}

export default AccountSettings;
