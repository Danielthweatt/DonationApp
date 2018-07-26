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
				<div className="pageHeight">
					<Header page="about" updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
					<Wrapper>			
						<AboutUs />
					
						<Team />

						
					</Wrapper>
				</div>
				<Footer />
			</div>
		
		);
	}
}

export default About; 