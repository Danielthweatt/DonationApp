import React,  { Component } from 'react'; 
import Header from '../../components/Header/Header'; 
import AboutUs from '../../components/AboutUs/AboutUs'; 
import Team from '../../components/Team/Team'; 


class About extends Component {

	render (){
		return (
			<div>
				<Header />
			
				<AboutUs />
			
				<Team />
			</div>
		
		);
	}
}

export default About; 