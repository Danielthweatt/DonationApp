import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import SignUpForm from '../../components/LoginSignUpComponents/SignUpForm'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class SignUp extends Component {

	render (){
		return (
			<div>
				<div className="pageHeight">
					<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<Wrapper>
						<SignUpForm />
					
					</Wrapper>
				</div>
				<Footer />
			</div>
		
		);
	}
}

export default SignUp; 