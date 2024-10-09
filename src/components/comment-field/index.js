import React from 'react';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import { useLocation, useNavigate } from "react-router-dom";
import './style.css';

const CommentField = (
  {
    isOpen = false,
    placeholder = 'Текст',
    addComment,
    id,
    isAuth = false,
    username = '',
    className = '',
    onClose = () => {}
  }
) => {

  const cn = bem('CommentField');
  const [data, setData] = React.useState(username ? `Мой ответ для ${username}` : '');
  const navigate = useNavigate();
  const location = useLocation()

  const onSendHandler = () => {
    if (data) {
      addComment(id, data, username ? 'comment' : 'article')
      if (username) {
        onClose()
      } else {
        setData('');
      }
    }
  }

  const onLoginHandler = () => {
    navigate('/login', { state: { back: location } })
  }

  if (!isOpen) return null;

  return (
    <div className={`${cn()} ${className}`}>
      {
        isAuth ? (
          <>
            <h3 className={cn('title')}>Новый {username ? 'ответ' : 'комментарий'}</h3>
            <textarea className={cn('field')} value={data} placeholder={placeholder} onChange={(e) => setData(e.target.value)} />
            <div className={cn('controls')}>
              <button onClick={onSendHandler}>Отправить</button>
              {username && <button onClick={onClose}>Отмена</button>}
            </div>
          </>
        ) : (
          <div className={cn('notAuth')}>
            <button className={cn('loginButton')} onClick={onLoginHandler}>Войдите</button>
            , чтобы иметь возможность {username ? 'ответить' : 'комментировать'}.
            {username && <button className={cn('cancelButton')} onClick={onClose}>Отмена</button>}
          </div>
        )
      }

    </div>
  );
};

CommentField.propTypes = {
  isOpen: PropTypes.bool,
  placeholder: PropTypes.string,
  addComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
  username: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func
};

export default CommentField;
