import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import AboutUs from '../../components/AboutUs/AboutUs'; 
import Team from '../../components/Team/Team'; 
import Wrapper from '../../components/Wrapper'; 
import Footer from '../../components/Footer/Footer'; 


class About extends Component {

	render (){
		return (
			<Wrapper>
				<Header />
			
				<AboutUs />
			
				<Team />

				<Footer />
			</Wrapper>
		
		);
	}
}

export default About; 