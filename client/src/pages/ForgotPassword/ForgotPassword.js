import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Footer from '../../components/Footer/Footer'; 



class Home extends React.Component {
	render () {
		return (
			< Wrapper >
				< Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				< ForgotPasswordForm />
				< Footer />
			</ Wrapper > 
		);
	}
}

export default Home;