import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const ErrorPage = ({ title = 'Страница не найдена!' }) => {
  return (
    <div className="ErrorPage">
      <h1>{title}</h1>
      <Link to='/'>Вернуться на главную</Link>
    </div>
  );
};

export default ErrorPage;
