import Popup from "./Popup";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <Popup
      onClickOnOverlay={props.onClickOnOverlay}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"info-tooltip"}>
      <img
        src={props.enterStatus ? success : fail}
        alt="Ответ"
        className="popup__state-img"/>
      <p
        className="popup__answer">
        {props.enterStatus
          ? props.text.success
          : props.text.fail}
      </p>
    </Popup>
  )
}

export default InfoTooltip