import React from 'react';
import logo from '../images/logo.svg';

export default function Header({ loggedIn, headerBtnTitle, email, handleClick}) {

  return (
    <div className="header__container">
      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип"
        />
        <div className="header__registration-container">
          <h3 className="header__email">{loggedIn ? email : null}</h3>
          <button className={`button button_place_header ${loggedIn ? 'button_exit' : ''}`} 
                  type="button"
                  onClick={handleClick}
                  >{headerBtnTitle}</button>
        </div>
      </header>
    </div>
  )
} 