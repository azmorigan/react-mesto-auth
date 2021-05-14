import {Link} from "react-router-dom";
import Input from "./Input";
import React from 'react';

function Register(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setEmailError(e.target.validationMessage)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    setPasswordError(e.target.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleRegister(email, password)
  }
  return (
    <div className="enter">
      <form
        onSubmit={handleSubmit}
        className="enter__form">
        <h2 className="enter__title">Регистрация</h2>
        <Input
          value={email}
          onChange={handleChangeEmail}
          name={"email"}
          className={"enter__input"}
          placeholder={"Email"}
          type={"email"}
          error={emailError}/>
        <Input
          value={password}
          onChange={handleChangePassword}
          name={"password"}
          className={"enter__input"}
          placeholder={"Пароль"}
          type={"password"}
          error={passwordError}
          minLength={6}/>
        <button
          type="submit"
          className="enter__button">
          Зарегистрироваться
        </button>
        <p className="enter__subtitle">Уже зарегистрированы?
          <Link
            to="/sign-in"
            className={"enter__link"}> Войти</Link>
        </p>
      </form>
    </div>
  )
}

export default Register