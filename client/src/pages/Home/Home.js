import React from 'react';
import Wrapper from '../../components/Wrapper';
import Jumbotron from '../../components/Jumbotron';
import PillarSection from '../../components/Pillar';

class Home extends React.Component {
    render () {
        return (
            < Wrapper >
                < Jumbotron />
                < PillarSection />
                < Mission />
            </ Wrapper > 
        )
    }
};

export default Home;