import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault()
    props.onCardDelete(props.deleteCardId)
  }

  return (
    <PopupWithForm
      onClickOnOverlay={props.onClickOnOverlay}
      name={"delete-card"}
      title={"Вы уверены?"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName={props.buttonName}>
    </PopupWithForm>
  )
}

export default ConfirmationPopup