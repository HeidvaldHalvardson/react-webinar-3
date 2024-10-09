import React from 'react';
import { cn as bem } from "@bem-react/classname";
import { formatDate } from "../../utils/format-date";
import CommentField from "../comment-field";
import './style.css';

const CommentItem = ({ comment, isAuth, addComment, commentOpen, commentToggle }) => {
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
        <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
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

export default CommentItem;
