import React, {useEffect, useRef, useState} from 'react';
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
    onClose = () => {},
    t = text => text
  }
) => {

  const cn = bem('CommentField');
  const initData = username ? `${t('comments.data.reply')} ${username} ` : t('comments.data.text')
  const [data, setData] = useState(initData);
  const navigate = useNavigate();
  const location = useLocation()
  const textareaRef = useRef(null)
  const notAuthRef = useRef(null)

  const onSendHandler = () => {
    const sendData = data.trim()
    if (sendData) {
      addComment(id, data, username ? 'comment' : 'article')
      if (!username) {
        setData(initData);
      }
    } else {
      textareaRef.current.focus()
    }
  }

  const onLoginHandler = () => {
    navigate('/login', { state: { back: location, commentId: id, username } })
  }

  useEffect(() => {
    if (username && isOpen && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(data.length, data.length)
      textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    return () => setData(initData)
  }, [username, isOpen, id]);

  useEffect(() => {
    if (notAuthRef.current && isOpen && username) {
      notAuthRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isOpen, id, username]);

  if (!isOpen) return null;

  return (
    <div className={`${cn()} ${className}`}>
      {
        isAuth ? (
          <>
            <h3 className={cn('title')}>{username ? t('comments.newReply') : t('comments.newComment')}</h3>
            <textarea
              className={cn('field')}
              value={data}
              placeholder={placeholder}
              onChange={(e) => setData(e.target.value)}
              ref={textareaRef}
            />
            <div className={cn('controls')}>
              <button onClick={onSendHandler}>{t('comments.send')}</button>
              {username && <button onClick={onClose}>{t('comments.cancel')}</button>}
            </div>
          </>
        ) : (
          <div ref={notAuthRef} className={cn('notAuth')}>
            <button className={cn('loginButton')} onClick={onLoginHandler}>{t('comments.signIn')}</button>
            {username ? t('comments.able.reply') : t('comments.able.comment')}
            {username && <button className={cn('cancelButton')} onClick={onClose}>{t('comments.cancel')}</button>}
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
  onClose: PropTypes.func,
  t: PropTypes.func
};

export default CommentField;
