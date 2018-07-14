import React from 'react';
// import Pillar from '../Pillar';

class Pillar extends React.Component {
    render() {
        return (
            <div className="card">
                <img className="card-img-top" src={this.props.imageURL} alt="Card image cap"/>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        )
    }
}

export default Pillar;