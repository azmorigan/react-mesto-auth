import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <a href="#" className="header__logo-link" target="_blank"/>
      {props.loggedIn
        ? <>
          <p className="header__email">{props.email}</p>
          <a
            className="header__stage header__stage_logout"
            onClick={props.onSignOut}>Выйти</a>
        </>
        : <Link
          onClick={props.handleEnter}
          to={props.enter ? "/sign-up" : "/sign-in"}
          className="header__stage">
          {props.loggedIn ? '' : props.enterTitle}
        </Link>
      }
    </header>
  )
}

export default Header;