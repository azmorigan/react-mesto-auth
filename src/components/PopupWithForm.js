import Popup from "./Popup";

function PopupWithForm(props) {
  return (
    <Popup {...props}>
      <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
      <form
        onSubmit={props.onSubmit}
        className={`form form_type_${props.name}`}
        name="formEdit"
        noValidate>
        {props.children}
        <button
          disabled={!props.isValid}
          type="submit"
          className={`form__button form__button_type_${props.name} ${!props.isValid && "form__button_disabled"}`}
        >{props.buttonName}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;