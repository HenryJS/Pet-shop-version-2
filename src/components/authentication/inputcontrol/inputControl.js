import React from "react";

import "../inputcontrol/inputControl.css";

function InputControl(props) {
  return (
    <div className='containers'>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
  );
}

export default InputControl;