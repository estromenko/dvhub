import "./styles.scss";

import logoImage from "assets/logo.png";
import profileImage from "assets/profile.svg";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { isAuthorized, logout } from "utils/auth";

import store from "../../store";

const Header: FC = () => (
  <header className="header">
    <Link to="/" className="header__link header__logo">
      <img src={logoImage} alt="Logo" />
      DVHub
    </Link>
    {isAuthorized() && (
      <nav className="header__navbar">
        <Link to="/pulls/" className="header__link">
          Pull Requests
        </Link>
        <Link to="/issues/" className="header__link">
          Issues
        </Link>
        <Link to="/repositories/" className="header__link">
          Repositories
        </Link>
        {store.user!.is_staff && (
          <a href="/_admin/" target="_blank" className="header__link">
            Admin Panel
          </a>
        )}
      </nav>
    )}
    <div className="header__right-links">
      {isAuthorized() && (
        <Link to="/profile">
          <img src={profileImage} alt="Profile" className="header__profile" />
        </Link>
      )}

      <div />
      {isAuthorized() ? (
        <Link
          to="/auth/login"
          className="header__link header__auth-link"
          onClick={logout}
        >
          Logout
        </Link>
      ) : (
        <div className="header__auth-links">
          <Link
            to="/auth/login"
            className="header__link header__auth-link"
            onClick={logout}
          >
            Sign In
          </Link>
          <div>/</div>
          <Link
            to="/auth/registration"
            className="header__link header__auth-link"
            onClick={logout}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </header>
);

export default observer(Header);
