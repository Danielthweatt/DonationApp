import React from 'react';

const InputKeyValue = (props) => (
  <div>
    <label htmlFor={props.id}>
    {props.text}
    </label>
    <input
      type="text"
      id={props.id}
      onChange={(e) => props.onTextboxChange(e, props.id )}
      value={props.value}
      />
    </div>
);

InputKeyValue.propTypes = {
  id: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

export default InputKeyValue;
