import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import logo from '../images/header__logo.svg';

export default function Header({ email, onSingOut }) {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  window.onresize = () => {
    setIsBurgerActive(false);
  };

  const singOut = () => {
    setIsBurgerActive(false);
    onSingOut();
  };

  return (
    <header className={`header ${isBurgerActive ? 'header_active' : ''}`}>
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <Routes>
        <Route
          path="/sing-in"
          element={
            <Link to="/sing-up" className="header__auth-link link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sing-up"
          element={
            <Link to="/sing-in" className="header__auth-link link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className={`header__auth ${isBurgerActive ? 'header__auth_active' : ''}`}>
                <span className="header__email">{email}</span>
                <button type="button" className="header__logout-link link" onClick={singOut}>
                  Выйти
                </button>
              </div>
              <button
                className="burger"
                type="button"
                onClick={() => setIsBurgerActive(!isBurgerActive)}
              >
                <span
                  className={`burger__line ${isBurgerActive ? 'burger__line_active' : ''}`}
                ></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}
