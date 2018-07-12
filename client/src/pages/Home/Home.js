import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import Jumbotron from '../../components/HomeComponents/Jumbotron';
import PillarSection from '../../components/HomeComponents/PillarSection';
import Mission from '../../components/HomeComponents/Mission';

class Home extends React.Component {
    render () {
        return (
            < Wrapper >
                < Header />
                < Jumbotron />
                < PillarSection />
                < Mission />
            </ Wrapper > 
        )
    }
};

export default Home;