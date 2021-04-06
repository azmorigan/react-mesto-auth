import Input from "./Input";
function Login(props) {
  return (
    <div className="enter">
      <form className="enter__form">
        <h2 className="enter__title">Вход</h2>
        <Input className={"enter__input"}/>
        <Input className={"enter__input"}/>
        <button
          type="submit"
          className="enter__button"/>
      </form>
    </div>
  )
}

export default Login;