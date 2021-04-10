import React from "react";

function Input(props) {

  function handleChange(e) {
    props.onChange(e)
  }

  return (
    <>
    <input
      onChange={handleChange}
      {...props}
    />
  <span id={`${props.id}-error`} className={`error error_type_${props.name}`}></span>
    </>
  )
}

export default Input