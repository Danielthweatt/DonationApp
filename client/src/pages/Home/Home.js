import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import PillarSection from '../../components/PillarSection';
import Mission from '../../components/Mission';
import Footer from '../../components/Footer/Footer'; 
import Jumbotron from '../../components/HomeComponents/Jumbotron';


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
