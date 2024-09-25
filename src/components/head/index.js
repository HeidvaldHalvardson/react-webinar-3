import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LangSwitcher from "../lang-switcher";

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LangSwitcher />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
