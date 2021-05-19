import Popup from "./Popup";
import React from "react";

function PopupWithForm(props) {

  const [isValid, setIsValid] = React.useState(false)
  const formRef = React.useRef()

  return (
    <Popup {...props}>
      <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
      <form
        onChange={()=>setIsValid(formRef.current.checkValidity())}
        ref={formRef}
        onSubmit={props.onSubmit}
        className={`form form_type_${props.name}`}
        name="formEdit"
        noValidate>
        {props.children}
        <button
          disabled={!isValid && !props.isInput}
          type="submit"
          className={`form__button form__button_type_${props.name} ${(!isValid && !props.isInput) && "form__button_disabled"}`}
        >{props.buttonName}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;