import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import SignUpForm from '../../components/LoginSignUpComponents/SignUpForm'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class SignUp extends Component {

	render (){
		return (
			<Wrapper>
				<Header />
                <SignUpForm />
				<Footer />
			</Wrapper>
		
		);
	}
}

export default SignUp; 