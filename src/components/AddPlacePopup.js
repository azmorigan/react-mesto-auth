import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('')
  const [link, setLink] = React.useState('')
  const [placeError, setPlaceError] = React.useState('')
  const [linkError, setLinkError] = React.useState('')
  const [isValid, setIsValid] = React.useState('false')

  function handleChangePlace(e) {
    setPlace(e.target.value)
    setPlaceError(e.target.validationMessage)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
    setLinkError(e.target.validationMessage)
  }

  function handleSubmit(e) {
    if (e.target.checkValidity()) {
      setIsValid(true)
    }
    e.preventDefault()
    props.onAddPlace({name: place, link})
  }

  React.useEffect(() => {
    setPlace('')
    setLink('')
    setPlaceError('')
    setLinkError('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"add-card"}
      title={"Новое место"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}
      isValid={isValid}>

      <Input
        name="place"
        id="input-place"
        value={place}
        onChange={handleChangePlace}
        type={"text"}
        placeholder="Название"
        className={`form__input form__input_type_add-card ${placeError && 'form__input_state_invalid'}`}
        error={placeError}
        minLength={2}
        maxLength={30}/>

      <Input
        name="link"
        id="input-link"
        value={link}
        onChange={handleChangeLink}
        type={"url"}
        placeholder="Ссылка на картинку"
        className={`form__input form__input_type_add-card ${linkError && 'form__input_state_invalid'}`}
        error={linkError}/>

    </PopupWithForm>
  )
}

export default AddPlacePopup