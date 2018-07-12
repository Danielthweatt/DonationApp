import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import AboutUs from '../../components/AboutComponents/AboutUs/AboutUs'; 
import Team from '../../components/AboutComponents/Team/Team'; 
import Wrapper from '../../components/Wrapper'; 


class About extends Component {

	render (){
		return (
			<Wrapper>
				<Header />
			
				<AboutUs />
			
				<Team />
			</Wrapper>
		
		);
	}
}

export default About; 