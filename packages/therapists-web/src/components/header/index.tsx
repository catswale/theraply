import React from 'react';
import style from './style.module.css';

const Header = () => (
  <header className={style.header}>
    <div>
      <img src="/logo.svg" alt="Theraply logo" />
    </div>
    <nav className={style.profileNav}>
      <div className={style.profileName}>
        <span className="regularBoldText">Jane Doe</span>
        <span className="regularText">a.done@gmail.com</span>
      </div>
      <button className={['regularButton', style.userProfileButton].join(' ')}>
        <span className={style.userIcon}></span>
      </button>
      <button className="regularButton">
        <span className={style.notificationIcon}></span>
      </button>
    </nav>
  </header>
);

export default Header;
