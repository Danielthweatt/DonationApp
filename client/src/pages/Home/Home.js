import React from 'react';
import Wrapper from '../../components/Wrapper';
import Jumbotron from '../../components/Jumbotron';
import Pillar from '../../components/Pillar';

const Home = () => {
    < Wrapper >
        < Jumbotron />
        <div className="row">
            <div className="col-md-4">
                < Pillar />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                < Pillar />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                < Pillar />
            </div>
        </div>
        < Mission />
    </ Wrapper > 
};

export default Home;