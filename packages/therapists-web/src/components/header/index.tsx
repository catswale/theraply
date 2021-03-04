import React from 'react';
import style from './style.module.css';

const Header = () => (
  <header className={style.header}>
    <div>
      <img src="/logo.svg" alt="Theraply logo" />
    </div>
    <nav className={style.profile__nav}>
      <div className={style.profile__name}>
        <span className="regular__bold__text">Jane Doe</span>
        <span className="regular__text">a.done@gmail.com</span>
      </div>
      <button className={['regular__button', style.user__profile__button].join(' ')}>
        <span className={style.user__icon}></span>
      </button>
      <button className="regular__button">
        <span className={style.notification__icon}></span>
      </button>
    </nav>
  </header>
);

export default Header;
