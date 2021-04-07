import Enter from "./Enter";

function Register(props) {
  return (
    <Enter
      title={"Регистрация"}
      buttonText={"Зарегистрироваться"}>
      <p className="enter__subtitle">Уже зарегистрированы? <a className={"enter__link"}>Войти</a></p>
    </Enter>
  )
}

export default Register