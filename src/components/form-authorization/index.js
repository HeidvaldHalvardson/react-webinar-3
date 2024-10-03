import React from 'react';
import PropTypes from "prop-types";
import useFormFields from "../../hooks/use-form-fields";
import { cn as bem } from "@bem-react/classname";
import './style.css';

const FormAuthorization = ({ isAuth, error, signIn = (_, __) => {}, t = text => text }) => {
  const cn = bem('FormAuthorization');
  const { values, onChange } = useFormFields({
    login: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(values.login, values.password);
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>{t('auth.signIn')}</h2>
      {
        isAuth
          ? <div>{t('auth.success')}</div>
          : <div className={cn('container')}>
            {
              Object.entries(values).map(([key, value]) => (
              <label className={cn('label')} key={key}>
                {t(`auth.${key}`)}
                <input type={key === 'password' ? 'password' : 'text'} name={key} value={value} onChange={onChange} />
              </label>
              ))
            }
            {error && <span className={cn('error')}>{error}</span>}
            <button>{t('auth.submit')}</button>
          </div>
      }
    </form>
  );
};

FormAuthorization.propTypes = {
  isAuth: PropTypes.bool,
  error: PropTypes.string,
  signIn: PropTypes.func,
  t: PropTypes.func,
}

export default FormAuthorization;
