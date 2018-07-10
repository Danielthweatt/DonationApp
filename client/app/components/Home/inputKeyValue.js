import React from 'react';

const InputKeyValue = (props) => (
  <div>
    <label htmlFor={props.id}>
    {props.text}
    </label>
    <input
      type="text"
      id={props.id}
      onChange={() => {}}
      value={props.value}
      />
    </div>
);

export default InputKeyValue;
