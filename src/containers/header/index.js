import React, { memo, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import AuthorizationControls from "../../components/authorization-controls";
import HeaderLayout from "../../components/header-layout";

const Header = () => {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation()

  const {t} = useTranslate()

  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
    user: state.user.data,
  }))

  const callbacks = {
    signOut: useCallback(() => {store.actions.authorization.signOut()}, [store]),
  }

  const signInHandler = () => {
    navigate('/login', { state: { from: location } })
  }

  return (
    <HeaderLayout>
      <AuthorizationControls
        isAuth={select.isAuth}
        signOut={callbacks.signOut}
        signIn={signInHandler}
        userName={select.user.profile?.name}
        signInButton={t('auth.signIn')}
        signOutButton={t('auth.signOut')}
        link="/profile"
      />
    </HeaderLayout>
  );
};

export default memo(Header);
