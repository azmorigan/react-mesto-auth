import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  // Клик на картинку
  function handleClick() {
    props.onCardClick(
      {
        name: props.name,
        link: props.link,
        alt: props.name,
        isOpen: true
      })
  }
  // Клик на лайк
  function handleLikeClick() {
    props.onCardLike(props)
  }

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = currentUser._id === props.owner._id
  const cardDeleteButtonClassName =
    `element__remove ${isOwn && 'element__remove_visible'}`

  const isLiked = props.likes.some(i => {
    return i._id === currentUser._id
  })
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`

  function openConfirmPopupAndGetDeleteCardId() {
    props.onCardDeleteClick(props.id)
  }
  return (
    <li className="element">
      <img
        onClick={handleClick}
        src={props.link}
        alt={props.name}
        className="element__img"/>
      <button
        onClick={openConfirmPopupAndGetDeleteCardId}
        className={cardDeleteButtonClassName}/>
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк"/>
          <p className="element__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;