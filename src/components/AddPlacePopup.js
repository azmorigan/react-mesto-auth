import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangePlace(e) {
    setPlace(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({name: place, link})
  }

  React.useEffect(() => {
    setPlace('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"add-card"}
      title={"Новое место"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}>

      <Input
        isOpen={props.isOpen}
        name="place"
        id="input-place"
        value={place}
        onChange={handleChangePlace}
        type={"text"}
        placeholder="Название"
        className={"form__input form__input_type_add-card"}
        styleClass={"add-card"}/>

      <Input
        isOpen={props.isOpen}
        name="link"
        id="input-link"
        value={link}
        onChange={handleChangeLink}
        type={"url"}
        placeholder="Ссылка на картинку"
        className={"form__input form__input_type_add-card"}
        styleClass={"add-card"}/>

    </PopupWithForm>
  )
}

export default AddPlacePopup