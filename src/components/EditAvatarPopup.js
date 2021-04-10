import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('')

  function handleChangeAvatar(e) {
    setAvatar(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({avatar})
  }

  React.useEffect(() => {
    setAvatar('')
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
        className={"form__input"}/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup