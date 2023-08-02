import { useState } from "react";
import UpdateComment from "./UpdateComment";
import "./comment-list.css";
import  swal  from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentPost } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);


  
  const [ updateComment, setUpdateComment ] = useState(false);
  const [ commentFormUpdate, setCommentFormUpdate ] = useState(null);


      const updateCommentHandler = (comment) => {
        setCommentFormUpdate(comment)
        setUpdateComment(true)

      };

          // delete post Hundler 
          const deleteCommentHundler = (commentId) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this comment!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((isOk) => {
                if (isOk) {
                  dispatch(deleteCommentPost(commentId));
                }
              });
          };

    return (
      <div className="comment-list">
        <h4 className="comment-list-count">{comments?.length} Comments</h4>
        {comments?.map(comment => (
            <div key={comment._id} className="comment-item">
              <div className="comment-item-info">
              <div className="comment-item-username">
                   { comment.username }
                </div>
                <div className="comment-item-time">
                    {new Date(comment.createdAt).toISOString()}
                </div>
                </div>
                <p className="comment-item-text">
                    {comment.text}
                </p>
              { user?._id === comment.user && (
                  <div className="comment-item-icon-wrapper">
                  <i onClick={() => updateCommentHandler(comment)} className="bi bi-pencil-square">Update Comment</i>
                  <i onClick={ () => deleteCommentHundler(comment._id)} className="bi bi-trash-fill">Delete Comment</i>
              </div>
              )}
              
            </div>
        ))}

        {updateComment &&  <UpdateComment  
                      commentFormUpdate={commentFormUpdate} 
                      setUpdateComment={setUpdateComment}
                      /> }

      </div>
    );
};

export default CommentList;