import React from 'react';
// import Pillar from '../Pillar';
import './PillarMobile.css'

class PillarMobile extends React.Component {
    render() {
        return (
            <div className="row mb-4">
                <div className="col-4 pillar-mobile-img-styling">
                    <div className="pillar-mobile-img-styling">
                        <img className="card-img-top" src={this.props.imageURL} alt="Card image cap"/>
                    </div>
                </div>
                <div className="col-8 pillar-mobile-body-styling">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        )
    }
}

export default PillarMobile;