import React from 'react';
import Pillar from '../Pillar';
import './PillarSection.css';
import iconClock from '../../../assets/images/icon-clock.png';
import iconHeart from '../../../assets/images/icon-heart.png';
import iconPerson from '../../../assets/images/icon-person.png';
import PillarMobile from '../Pillar/Mobile';

class PillarSection extends React.Component {
    render() {
        return (
            <div className="process-card mb-4" >
                <center>
                    <h2>Our Process</h2>
                    <hr></hr>
                </center>
                <br></br>
                <div className="card-deck">
                    < Pillar imageURL={iconClock} />
                    < Pillar imageURL={iconHeart} />
                    < Pillar imageURL={iconPerson} />
                </div>
                <div className="mobile-pillars" >
                    < PillarMobile imageURL={iconClock} />
                    < PillarMobile imageURL={iconHeart} />
                    < PillarMobile imageURL={iconPerson} />
                </div>
            </div>
        )
    }
}

export default PillarSection;