import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "./create-post.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from '../../redux/apiCalls/postApiCall';
import { MutatingDots } from "react-loader-spinner";
import { featchCategories } from '../../redux/apiCalls/categoryApiCall';

const CreatePostOne = () => {
    const dispatch = useDispatch()
    const { loding, isPostCreated} = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)
    
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ file, setFile ] = useState(null);
    

    //////form submit Handler \\\\\\\
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if(title.trim() === "") return toast.error("post Title is required")
        if(category.trim() === "") return toast.error("post category is required")
        if(description.trim() === "") return toast.error("post description is required")
        if(!file) return toast.error("post image is required")
        const formData = new FormData()
        formData.append("image", file)
        formData.append("title", title)
        formData.append("category", category)
        formData.append("description", description)
    
        dispatch(createPost(formData))

    };

    const navigate = useNavigate();
    useEffect(() => {
        if(isPostCreated) {
            navigate("/")
        }
    }, [navigate, isPostCreated])

    useEffect(() => {
        dispatch(featchCategories())
    },[])

    return (
        <section className="create-post">
         
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">
                <input
                 type="text" 
                 placeholder="post title"
                 className="create-post-input" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)} 
                 />
                 <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} 
                    className="create-post-input">
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
                     className="create-post-textarea" 
                     rows="5"
                     placeholder="Post Description" 
                     value={description}
                 onChange={(e) => setDescription(e.target.value)} 
                 >

                 </textarea>
                 <input 
                    type="file" 
                    name="file" 
                    id="file" 
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])} 
                />
                <button type="submit" className="create-post-btn">
                   { 
                   loding ? 
                   <MutatingDots 
                            height="100"
                            width="100"
                            color="#4fa94d"
                            secondaryColor= '#4fa94d'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                     />:  
                     "Create" 
                     }
                </button>
            </form>
            </section>
    );
};

export default CreatePostOne;