import React from 'react';
import { Link } from "react-router-dom";
import { useLanguage } from "../../translations";
import './style.css';

const ErrorPage = ({ title }) => {
  const { translation } = useLanguage()

  return (
    <div className="ErrorPage">
      <h1>
        {title || translation['Страница не найдена']}
      </h1>
      <Link to='/'>{translation['Вернуться на главную'].toString()}</Link>
    </div>
  );
};

export default ErrorPage;
