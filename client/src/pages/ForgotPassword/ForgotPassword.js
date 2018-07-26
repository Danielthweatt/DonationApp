import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Footer from '../../components/Footer/Footer'; 



class ForgotPassword extends React.Component {
	render () {
		return (
			<div>
				< Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				< Wrapper >
					< ForgotPasswordForm userInfo={this.props.userInfo} />
				</ Wrapper > 
				< Footer />
			</div>
		);
	}
}

export default ForgotPassword;