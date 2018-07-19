import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import SignUpForm from '../../components/LoginSignUpComponents/SignUpForm'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class SignUp extends Component {

	render (){
		return (
			<Wrapper>
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<SignUpForm />
				<Footer />
			</Wrapper>
		
		);
	}
}

export default SignUp; 