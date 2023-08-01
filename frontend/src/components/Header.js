import React from 'react';
import headerLogo from './../images/header-logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

const Header = ({ loggedIn, userEmail, onLogOut }) => {
  // const location = useLocation();

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      {
        loggedIn ? (
          <div className="header__navbar">
            <p className="header__email">{userEmail}</p>
            <button className="header__button" onClick={onLogOut}>
              Выйти
            </button>
          </div>
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={
                <Link to="/signin" className="header__link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/signin"
              element={
                <Link to="/signup" className="header__link">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        )
        // location.pathname === '/signup' ?
        // <Link to="/signin" className="header__link">Войти</Link>
        // :
        // <Link to="/signup" className="header__link">Регистрация</Link>
      }
    </header>
  );
};

export default Header;
