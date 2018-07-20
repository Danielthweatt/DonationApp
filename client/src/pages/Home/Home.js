import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import PillarSection from '../../components/HomeComponents/PillarSection';
import Mission from '../../components/HomeComponents/Mission';
import Footer from '../../components/Footer/Footer'; 
import Jumbotron from '../../components/HomeComponents/Jumbotron';
import './Home.css'


class Home extends React.Component {
	render () {
		return (
			<div>
				< Wrapper >
					< Header updateUser={this.props.updateUser} userInfo={this.props.userInfo} />
				</ Wrapper >
					< Jumbotron />
				< Wrapper >
					< PillarSection />
					< Mission />
					< Footer />
				</ Wrapper > 
			</div>
		);
	}
}

export default Home;
