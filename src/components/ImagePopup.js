function ImagePopup(props) {
  return (
    <div onClick={props.onClickOnOverlay} className={`popup popup_type_modal ${props.card.isOpen ? "popup_opened" : ''}`}>
      <div className="modal">
        <img src={props.card.link} alt={props.card.name} className="modal__image"/>
        <p className="modal__title">{props.card.name}</p>
        <button className="close-button close-button_type_modal" onClick={props.onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup;