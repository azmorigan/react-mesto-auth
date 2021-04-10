import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Input from "./Input";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description
    })
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [props.isOpen, currentUser.name, currentUser.about])

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}>
      <Input
        name="name"
        id="input-name"
        value={name}
        onChange={handleChangeName}
        className={"form__input"}
        type={"text"}/>
      <Input
        name="job"
        id="input-job"
        value={description}
        onChange={handleChangeDescription}
        className={"form__input"}
        type={"text"}/>
    </PopupWithForm>
  )
}

export default EditProfilePopup