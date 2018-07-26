import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Footer from '../../components/Footer/Footer'; 



class ForgotPassword extends React.Component {
	render () {
		return (
			<div>
				<div className="pageHeight">
					< Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					< Wrapper >
						< ForgotPasswordForm userInfo={this.props.userInfo} />
					</ Wrapper > 
				</div>
				< Footer />
			</div>
		);
	}
}

export default ForgotPassword;