import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import LoginForm from '../../components/LoginSignUpComponents/LoginForm'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class Login extends Component {

	render (){
		console.log(this.props.updateUser);
		return (
			<Wrapper>
				<Header />
				<LoginForm updateUser={this.props.updateUser} />
				<Footer />
			</Wrapper>
		
		);
	}
}

export default Login; 