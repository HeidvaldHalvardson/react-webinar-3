import React, {memo, useMemo, useState} from 'react';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../comment-item";
import CommentField from "../comment-field";
import './style.css';

const CommentsList = ({ comments, count, addComment, isAuth, params }) => {
  const [commentOpen, setCommentOpen] = useState('')

  const formatComments = useMemo(() => {
    return [...treeToList(listToTree(comments), (item, level) => ({
      ...item,
      padding: 30 * (level - 1),
    })).slice(1)]
  }, [comments, addComment])

  return (
    <div className="CommentsList">
      <h2 className="CommentsList-title">Комментарии ({count})</h2>
      <div className="CommentsList-inner">
        {formatComments.length !== 0 &&
          formatComments.map((comment) => (
            <CommentItem isAuth={isAuth} key={comment._id} comment={comment} addComment={addComment} commentOpen={commentOpen} commentToggle={setCommentOpen} />
          ))
        }
        <CommentField isAuth={isAuth} addComment={addComment} id={params.id} isOpen={!commentOpen} />
      </div>
    </div>
  );
};

export default memo(CommentsList);
