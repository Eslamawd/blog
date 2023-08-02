import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./update-comment.css";
import { updateCommentPost } from '../../redux/apiCalls/commentApiCall';

const UpdateComment = ({ setUpdateComment, commentFormUpdate }) => {

    const dispatch = useDispatch()


    const [text, setText] = useState('this is so great');

    const formSubmitUpdateHandler = (e) => {
        e.preventDefault()

        
        if(text.trim() === "") return toast.error(" please raigt samthing")
        
        dispatch(updateCommentPost(commentFormUpdate?._id, { text }))
        setUpdateComment(false)
    }
    return (
        <div className="update-comment">
        <form onClick={formSubmitUpdateHandler}  className="update-comment-form">
            <abbr title="close">
                <i onClick={() => setUpdateComment(prev => !prev)} className="bi bi-x-circle-fill update-comment-form-close">x</i>
            </abbr>
            <h1 className="update-comment-title">Edit Comment</h1>
            <input 
                type="text"
                className="update-comment-input" 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        
                <button type="submit" className="update-comment-btn">
                    Update Comment
                </button>
        </form>
    </div>
    )
};
export default UpdateComment;