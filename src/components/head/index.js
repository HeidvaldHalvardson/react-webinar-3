import { memo } from 'react';
import PropTypes from 'prop-types';
import LangSwitcher from "../../translations/ui/lang-switcher";
import './style.css';

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
