import Enter from "./Enter";
import {Link} from "react-router-dom";

function Register(props) {
  return (
    <Enter
      title={"Регистрация"}
      buttonText={"Зарегистрироваться"}>
      <p className="enter__subtitle">Уже зарегистрированы?
        <Link to="/sign-in" className={"enter__link"}> Войти</Link>
      </p>
    </Enter>
  )
}

export default Register