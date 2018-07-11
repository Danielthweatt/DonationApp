import React from 'react';
import Wrapper from '../../components/Wrapper';
import Jumbotron from '../../components/Jumbotron';
import Header from '../../components/Header';
import PillarSection from '../../components/Pillar';
import Mission from '../../components/Mission';

class Home extends React.Component {
    render () {
        return (
            < Wrapper >
                < Header />
                < Jumbotron />
                {/* < PillarSection /> */}
                {/* < Mission /> */}
            </ Wrapper > 
        )
    }
};

export default Home;