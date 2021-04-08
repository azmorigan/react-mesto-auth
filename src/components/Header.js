import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <a href="#" className="header__logo-link" target="_blank"/>
      <Link
        onClick={props.handleEnter}
        to={props.enter ? "/sign-up" : "/sign-in"}
        className="header__stage">
        {props.enterTitle}
      </Link>
    </header>
  )
}

export default Header;