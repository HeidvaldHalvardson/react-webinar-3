import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import './style.css';

const Header = () => {
  const store = useStore();
  const navigate = useNavigate();

  const {t} = useTranslate()

  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
    user: state.user.data,
  }))

  const callbacks = {
    signOut: useCallback(() => {store.actions.authorization.signOut()}, [store]),
    getUser: useCallback(() => {store.actions.user.getUser()}, [store])
  }

  useEffect(() => {
    if (select.isAuth && Object.keys(select.user).length === 0) {
      callbacks.getUser();
    }
  }, []);

  return (
    <header className="Header">
      {
        select.isAuth ? (
          <>
            <Link to="/profile" className="Header-user">{select.user.profile?.name}</Link>
            <button onClick={callbacks.signOut}>{t('auth.signOut')}</button>
          </>
        ) : <button onClick={() => navigate('/login')}>{t('auth.signIn')}</button>
      }
    </header>
  );
};

export default Header;
