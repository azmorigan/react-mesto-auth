function Popup(props) {
  return (
    <div onClick={props.onClickOnOverlay}
         className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        {props.children}
        <button
          className="close-button"
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"/>
      </div>
    </div>
  )
}

export default Popup