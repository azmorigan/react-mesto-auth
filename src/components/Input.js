import React from "react";

function Input(props) {

  function handleChange(e) {
    props.onChange(e)
  }

  return (
    <>
      <input
        onChange={handleChange}
        required
        {...props}
      />
      {props.error && <span id={`${props.id}-error`} className={`error error_type_${props.name}`}>{props.error}</span>}
    </>
  )
}

export default Input