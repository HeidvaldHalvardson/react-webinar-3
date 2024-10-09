import React from 'react';
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatDate } from "../../utils/format-date";
import CommentField from "../comment-field";
import './style.css';

const CommentItem = ({ comment, isAuth = false, addComment, commentOpen, commentToggle, lang = 'ru' }) => {
  const cn = bem('CommentItem');

  const onOpenModal = () => {
    commentToggle(comment._id)
  }

  const onCloseModal = () => {
    commentToggle('')
  }

  return (
    <div className={cn()} style={{paddingLeft: `${comment.padding}px`}}>
      <div className={cn('head')}>
        <div className={cn('username')}>{comment.author.profile.name}</div>
        <div className={cn('date')}>{formatDate(comment.dateCreate, lang)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} onClick={onOpenModal}>Ответить</button>
      <CommentField
        className={cn('field')}
        isAuth={isAuth}
        onClose={onCloseModal}
        addComment={addComment}
        id={comment._id}
        username={comment.author.profile.name}
        isOpen={commentOpen === comment._id}
      />
    </div>
  );
};


CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    padding: PropTypes.number,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      })
    })
  }).isRequired,
  isAuth: PropTypes.bool,
  addComment: PropTypes.func.isRequired,
  commentOpen: PropTypes.string.isRequired,
  commentToggle: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

export default CommentItem;
