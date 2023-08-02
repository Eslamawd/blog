import "./add-comment.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId }) => {
    const dispatch = useDispatch()
    
    const [text, setText] = useState("")

    const formSubmitHandler = (e) => {
        e.preventDefault()
        
        if(text.trim() === "") return toast.error("post Comment is required")

       dispatch(createComment({ text, postId }));
    }


    return (
      <form onSubmit={formSubmitHandler} className="add-comment">
            <input 
                type="text"
                placeholder="Add comment"
                className="add-comment-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
             />
             <button type="submit" className="add-comment-btn">
                Comment
             </button>
      </form>
    );
};

export default AddComment;