import React, { useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";

const Profile = () => {
  const store = useStore()
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.user.data,
    isAuth: state.authorization.isAuth,
    waiting: state.user.waiting,
  }));

  const callbacks = {
    getUser: useCallback(() => {store.actions.user.getUser()}, [store])
  }

  useEffect(() => {
    if (!select.isAuth) {
      navigate('/login')
    }
  }, [select.isAuth]);

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileInfo t={ t } user={select.user} />
      </Spinner>
    </PageLayout>
  );
};

export default Profile;
