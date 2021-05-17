import {Link, Switch, Route} from "react-router-dom";
import React from 'react';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false)

  function openBurgerMenu() {
    setIsBurgerOpen(!isBurgerOpen)
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo-link"/>
      <Switch>

        <Route exact path='/'>
            <p
              className={`header__email ${isBurgerOpen && "header__email_visible"}`}>
              {props.email}
            </p>
            <button
              className={`header__stage header__stage_logout ${isBurgerOpen && "header__stage_visible"}`}
              onClick={props.onSignOut}>
              Выйти
            </button>
            <button
              className={`header__burger ${isBurgerOpen && "header__burger_close"}`}
              onClick={openBurgerMenu}/>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__stage' to='/sign-in'>
            Войти
          </Link>
        </Route>
        <Route path='/sign-in'>
          <Link className='header__stage' to='/sign-up'>
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;