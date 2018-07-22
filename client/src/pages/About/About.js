import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import AboutUs from '../../components/AboutComponents/AboutUs/AboutUs'; 
import Team from '../../components/AboutComponents/Team/Team'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class About extends Component {

	render (){
		return (
			<div>
				<Header page="about" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				<Wrapper>			
					<AboutUs />
				
					<Team />

					
				</Wrapper>
				<Footer />
			</div>
		
		);
	}
}

export default About; 