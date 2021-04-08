import Popup from "./Popup";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {
  const status = false
  return (
    <Popup
      isOpen={props.isOpen}
      name={"info-tooltip"}>
      <img
        src={status ? success : fail}
        alt="Ответ"
        className="popup__state-img"/>
      <p
        className="popup__answer">
        {status
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </p>
    </Popup>
  )
}

export default InfoTooltip