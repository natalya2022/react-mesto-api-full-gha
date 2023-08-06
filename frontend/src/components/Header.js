import React  from 'react';
import headerLogo from './../images/header-logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

const Header = ({ loggedIn, userEmail, onLogOut, mobileMenuOpen, toggleMenu }) => {
 
  return (
    <header className={`header ${mobileMenuOpen ? "header__menu-open" : ""}` }>
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <Routes>
      {
        loggedIn ? (
          <Route
            path="/" 
            element={
              <>
                <button
                  className="header__burger"
                  type="button"
                  aria-label="меню"
                  onClick={toggleMenu}
                ></button>
                <div className="header__navbar">
                  <p className="header__email">{userEmail}</p>
                  <button className="header__button" onClick={onLogOut}>
                    Выйти
                  </button>
                </div>
              </>
            }
         />
        ) : (
          <>
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
          </>
        )
      }
      </Routes>
    </header>
  )  
};

export default Header;

