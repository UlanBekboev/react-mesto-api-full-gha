import React from 'react';
import headerLogo from '../images/header-logo.svg';
import '../pages/index.css';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="место Russia" className="header__logo"/>
      <ul className="header__auth">
        {props.loggedIn && <li><span className="header__mail">{props.email}</span></li>}
        <li><Link to={props.route} type="button" className="header__sign-out" onClick={props.onClick}>{props.title}</Link></li>
      </ul>
    </header>
  );
}

export default Header;
