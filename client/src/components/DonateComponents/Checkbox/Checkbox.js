import React from 'react';

const Checkbox = props => (

    <div className="checkbox">
        <label for="save-payment">Save my payment info</label>
        <input type="checkbox" id="save-payment" name="checkbox" onChange={props.handleCheckbox}/>
    </div>
)

export default Checkbox;