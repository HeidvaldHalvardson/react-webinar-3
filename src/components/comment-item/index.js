import React from 'react';
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatDate } from "../../utils/format-date";
import './style.css';

const CommentItem = ({
                       comment,
                       commentToggle,
                       lang = 'ru',
                       currentUser = '',
                       openAnswerField = (_, __) => {},
                       replyButtonText = 'Ответить',
}) => {
  const cn = bem('CommentItem');

  const onOpenModal = () => {
    commentToggle(comment._id)
    openAnswerField(comment._id, comment.author.profile.name)
  }

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div className={cn('username', { current: comment.author.profile.name === currentUser })}>{comment.author.profile.name}</div>
        <div className={cn('date')}>{formatDate(comment.dateCreate, lang)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} onClick={onOpenModal}>{replyButtonText}</button>
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
  commentToggle: PropTypes.func.isRequired,
  lang: PropTypes.string,
  isCurrentUser: PropTypes.string,
  openAnswerField: PropTypes.func,
  replyButtonText: PropTypes.string
};

export default CommentItem;
