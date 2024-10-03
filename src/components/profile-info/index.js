import React from 'react';
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css'

const ProfileInfo = ({ t = text => text, user }) => {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('description')}>
        <p>
          {t('profile.name')}:
          <span>{user.profile?.name}</span>
        </p>
        <p>
          {t('profile.phone')}:
          <span>{user.profile?.phone}</span>
        </p>
        <p>
          email:
          <span>{user.email}</span>
        </p>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      phone: PropTypes.string,
      name: PropTypes.string,
    })
  }).isRequired,
  t: PropTypes.func,
}

export default ProfileInfo;
