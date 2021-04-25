import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('')
  const [avatarError, setAvatarError] = React.useState('')

  function handleChangeAvatar(e) {
    setAvatar(e.target.value)
    setAvatarError(e.target.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({avatar})
  }

  React.useEffect(() => {
    setAvatar('')
    setAvatarError('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}>
      <Input
        name="avatar"
        id="input-avatar"
        value={avatar}
        onChange={handleChangeAvatar}
        type={"url"}
        placeholder="Ссылка на картинку"
        className={"form__input"}
        error={avatarError}/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup