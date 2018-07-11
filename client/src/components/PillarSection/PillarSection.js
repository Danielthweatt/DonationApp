import React from 'react';
import Pillar from '../Pillar';

class PillarSection extends React.Component {
    render() {
        return (
            <div className="card-deck mb-4">
                {/* <div className="col-md-4"> */}
                    < Pillar imageURL="https://i.kym-cdn.com/photos/images/original/000/957/777/4e9.jpg" />
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                    < Pillar imageURL="https://thumbs.dreamstime.com/b/rich-tourist-photographer-3524212.jpg" />
                {/* </div> */}
                {/* <div className="col-md-4"> */}
                    < Pillar imageURL="https://comps.canstockphoto.com/business-man-money-stock-photography_csp0083500.jpg" />
                {/* </div> */}
            </div>
        )
    }
}

export default PillarSection;