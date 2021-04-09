import Input from "./Input";

function Login(props) {
  return (
    <div className="enter">
      <form className="enter__form">
        <h2 className="enter__title">Вход</h2>
        <Input
          className={"enter__input"}
          placeholder={"Email"}
          type={"email"}/>
        <Input
          className={"enter__input"}
          placeholder={"Пароль"}
          type={"password"}/>
        <button
          type="submit"
          className="enter__button">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login