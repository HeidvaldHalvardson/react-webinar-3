import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

const AuthorizationControls = (props) => {
  const {
    isAuth,
    signOut,
    signIn,
    userName,
    signInButton = 'Вход',
    signOutButton = 'Выход',
    link='/profile'
  } = props;

  return (
    <div className="AuthorizationControls">
      {
        isAuth ? (
          <>
            <Link to={link} className="AuthorizationControls-user">{userName}</Link>
            <button onClick={signOut}>{signOutButton}</button>
          </>
        ) : <button onClick={signIn}>{signInButton}</button>
      }
    </div>
  );
};

AuthorizationControls.PropTypes = {
  isAuth: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  signInButton: PropTypes.string,
  signOutButton: PropTypes.string,
  link: PropTypes.string,
}

export default AuthorizationControls;
