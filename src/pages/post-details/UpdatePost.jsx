import  { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "./update-post.css";

import {  useDispatch, useSelector } from "react-redux";
import { updatePost } from '../../redux/apiCalls/postApiCall';
import { featchCategories } from '../../redux/apiCalls/categoryApiCall';


const UpdatePost = ({ setUpdatePost, post }) => {

    const dispatch = useDispatch()
    
    const { categories } = useSelector(state => state.category)

    const [title, setTitle] = useState(post.title);
    const [category, setCategory] = useState(post.category);
    const [description, setDescription] = useState(post.description);

    const formSubmitUpdateHandler = (e) => {
        e.preventDefault()

        
        if(title.trim() === "") return toast.error("post Title is required")
        if(category.trim() === "") return toast.error("post category is required")
        if(description.trim() === "") return toast.error("post description is required")
    
        dispatch(updatePost({ title , description, category}, post?._id))
        setUpdatePost(false)
    }

    useEffect(() => {
        dispatch(featchCategories())
    },[])

    return (
        <div className="update-post">
            <form onClick={formSubmitUpdateHandler}  className="update-post-form">
                <abbr title="close">
                    <i onClick={() => setUpdatePost(prev => !prev)} className="bi bi-x-circle-fill update-post-form-close">x</i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input 
                    type="text"
                    className="update-post-input" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select className="update-post-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                    <option disabled value="">
                        Select A Category
                    </option> 
                    {categories?.map((category => 
                    <option 
                         value={category.title}
                         key={category._id}
                         >
                       
                        {category.title}
                    </option>))}
                </select>
                    <textarea
                        className="update-post-textarea" 
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    <button type="submit" className="update-post-btn">
                        Update Post
                    </button>
            </form>
        </div>
    );
};

export default UpdatePost;