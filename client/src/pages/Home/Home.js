import React from 'react';
import Wrapper from '../../components/Wrapper';
import Jumbotron from '../../components/Jumbotron';
import Header from '../../components/Header';
import PillarSection from '../../components/PillarSection';
import Mission from '../../components/Mission';
import Footer from '../../components/Footer/Footer'; 

class Home extends React.Component {
	render () {
		return (
			< Wrapper >
				< Header />
				< Jumbotron />
				< PillarSection />
				< Mission />
				< Footer />
			</ Wrapper > 
		);
	}
}

export default Home;
