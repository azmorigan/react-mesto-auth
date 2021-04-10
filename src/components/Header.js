import {Link, Switch, Route} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link"/>
      <Switch>
        <Route exact path='/'>
            <p className='header__email'>{props.email}</p>
            <button
              className='header__stage header__stage_logout'
              onClick={props.onSignOut}>
              Выйти
            </button>
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