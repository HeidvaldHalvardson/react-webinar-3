import React, { useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import FormAuthorization from "../../components/form-authorization";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

const Authorization = () => {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
    error: state.authorization.error,
    waiting: state.authorization.waiting,
  }))

  const { t } = useTranslate();

  const callbacks = {
    signIn: useCallback((email, password) => store.actions.authorization.signIn(email, password), [store]),
  }

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <FormAuthorization signIn={callbacks.signIn} t={t} isAuth={select.isAuth} error={select.error} />
      </Spinner>
    </PageLayout>
  );
};

export default Authorization;
