function PopupWithForm(props) {
  return (
    <div onClick={props.onClickOnOverlay}
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className={`popup__container popup__container_type_${props.name}`}>
      <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
      <form
        onSubmit={props.onSubmit}
        className={`form form_type_${props.name}`}
        name="formEdit"
        noValidate>
        {props.children}
        <button
          type="submit"
          className={`form__button form__button_type_${props.name}`}
        >{props.buttonName}</button>
      </form>
      <button className="close-button" onClick={props.onClose} type="button" aria-label="Закрыть всплывающее окно"/>
    </div>
  </div>
  )
}

export default PopupWithForm;