import React, {memo, useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../comment-item";
import CommentField from "../comment-field";
import './style.css';

const CommentsList = ({
                        comments = [],
                        count = 0,
                        addComment,
                        isAuth = false,
                        params,
                        t = text => text,
                        lang = 'ru',
                        currentUser = ''
}) => {
  const location = useLocation()
  const [commentOpen, setCommentOpen] = useState('')
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  const formatComments = useMemo(() => {
    return [...treeToList(listToTree(commentsList), (item, level) => {

      let padding = 30 * (level - 1)

      if (padding > 270) {
        padding = 270
      }

      return {
        ...item,
        padding,
      }
    }).slice(1)]
  }, [comments, commentsList, addComment])

  const onCloseField = () => {
    setCommentOpen('')
    setCommentsList((prevState) => {
      return [...prevState.filter((item) => item._id !== 'answer')]
    })
  }

  const openAnswerField = (_id, username) => {
    setCommentsList((prevState) => ([
      ...prevState.filter((item) => item._id !== 'answer'),
      {
        _id: 'answer',
        username,
        parent: { _id}
      }
    ]))
  }

  useEffect(() => {
    if (location.state?.commentId && location.state?.username) {
      setCommentOpen(location.state?.commentId)
      openAnswerField(location.state?.commentId, location.state?.username)
    }
  }, [location]);

  const onAddHandler = (id, username, type) => {
    addComment(id, username, type)
    setCommentOpen('')
  }

  return (
    <div className="CommentsList">
      <h2 className="CommentsList-title">{t('article.comments')} ({count})</h2>
      <div className="CommentsList-inner">
        {
          formatComments.length !== 0 &&
          formatComments.map((comment) => (
            <div key={comment._id} style={{paddingLeft: `${comment.padding}px`}}>
              {
                comment._id !== 'answer' ? (
                  <CommentItem
                    comment={comment}
                    commentToggle={setCommentOpen}
                    lang={lang}
                    currentUser={currentUser}
                    openAnswerField={openAnswerField}
                    replyButtonText={t('comments.reply')}
                  />
                ) : (
                  <CommentField
                    isAuth={isAuth}
                    onClose={onCloseField}
                    addComment={onAddHandler}
                    id={comment.parent._id}
                    username={comment.username}
                    isOpen={commentOpen === comment.parent._id}
                    padding={comment.padding}
                    placeholder={t('comments.placeholder')}
                    t={t}
                  />
                )
              }
            </div>
          ))
        }
        <CommentField isAuth={isAuth} addComment={addComment} id={params.id} isOpen={!commentOpen} placeholder={t('comments.placeholder')} t={t} />
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  count: PropTypes.number,
  addComment: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
  lang: PropTypes.string,
  currentUser: PropTypes.string,
};

export default memo(CommentsList);
