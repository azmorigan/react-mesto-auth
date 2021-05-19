import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Input from "./Input";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [descriptionError, setDescriptionError] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  function handleChangeName(e) {
    setName(e.target.value)
    setNameError(e.target.validationMessage)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
    setDescriptionError(e.target.validationMessage)
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
    setNameError('')
    setDescriptionError('')
  }, [props.isOpen, currentUser.name, currentUser.about])

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}
      isInput={false}>
      <Input
        name="name"
        id="input-name"
        value={name}
        onChange={handleChangeName}
        className={`form__input ${nameError && 'form__input_state_invalid'}`}
        type={"text"}
        minLength={2}
        maxLength={30}
        error={nameError}/>
      <Input
        name="job"
        id="input-job"
        value={description}
        onChange={handleChangeDescription}
        className={`form__input ${descriptionError && 'form__input_state_invalid'}`}
        type={"text"}
        minLength={2}
        maxLength={50}
        error={descriptionError}/>
    </PopupWithForm>
  )
}

export default EditProfilePopup