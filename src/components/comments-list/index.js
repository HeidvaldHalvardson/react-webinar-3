import React, {memo, useMemo, useState} from 'react';
import PropTypes from "prop-types";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../comment-item";
import CommentField from "../comment-field";
import './style.css';

const CommentsList = ({ comments = [], count = 0, addComment, isAuth = false, params, t = text => text, lang = 'ru' }) => {
  const [commentOpen, setCommentOpen] = useState('')

  const formatComments = useMemo(() => {
    return [...treeToList(listToTree(comments), (item, level) => ({
      ...item,
      padding: 30 * (level - 1),
    })).slice(1)]
  }, [comments, addComment])

  return (
    <div className="CommentsList">
      <h2 className="CommentsList-title">{t('article.comments')} ({count})</h2>
      <div className="CommentsList-inner">
        {formatComments.length !== 0 &&
          formatComments.map((comment) => (
            <CommentItem isAuth={isAuth} key={comment._id} comment={comment} addComment={addComment} commentOpen={commentOpen} commentToggle={setCommentOpen} lang={lang} />
          ))
        }
        <CommentField isAuth={isAuth} addComment={addComment} id={params.id} isOpen={!commentOpen} />
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
};

export default memo(CommentsList);
