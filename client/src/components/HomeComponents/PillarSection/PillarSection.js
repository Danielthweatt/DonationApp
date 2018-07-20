import React from 'react';
import Pillar from '../Pillar';
import './PillarSection.css'

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
                    < Pillar imageURL="https://i.kym-cdn.com/photos/images/original/000/957/777/4e9.jpg" />
                    < Pillar imageURL="https://thumbs.dreamstime.com/b/rich-tourist-photographer-3524212.jpg" />
                    < Pillar imageURL="https://comps.canstockphoto.com/business-man-money-stock-photography_csp0083500.jpg" />
                </div>
            </div>
        )
    }
}

export default PillarSection;