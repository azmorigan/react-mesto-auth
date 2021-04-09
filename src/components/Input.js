import React from "react";

function Input(props) {

  function handleChange(e) {
    props.onChange(e)
  }

  return (
    <>
    <input
      onChange={handleChange}
      value={props.value}
      type={props.type}
      className={props.className}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
    />
  <span id={`${props.id}-error`} className={`error error_type_${props.name}`}></span>
    </>
  )
}

export default Input