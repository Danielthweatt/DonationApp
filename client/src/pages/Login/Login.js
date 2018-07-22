import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import LoginForm from '../../components/LoginSignUpComponents/LoginForm'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 
import '../../components/Input/Input.css'; 


class Login extends Component {

	render (){
		return (
			<div>
				<Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>
					<LoginForm updateUser={this.props.updateUser} />


				
				</Wrapper>
				<Footer />
			</div>
		
		);
	}
}

export default Login; 