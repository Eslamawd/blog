import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  swal  from "sweetalert";

import "./post-details.css";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePost from "./UpdatePost";
import { deletePost, fetchPost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {

    const dispatch = useDispatch();

    const { post } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);


    const [ file, setFile ] = useState(null);
    const [ updatePost, setUpdatePost ] = useState(false);


    const { postId } = useParams();


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchPost(postId));
      }, [postId]);

      const updateUserImageSubmitHandler = (e) => {
        e.preventDefault();

        if(!file) return toast.error("post image is required")
        const formData = new FormData()
        formData.append("image", file)
        dispatch(updatePostImage(formData, post?._id))


        console.log(file)
      };
      // delete post Hundler 

      const navigate = useNavigate();

      const deletePostHundler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
                dispatch(deletePost(post?._id));
                navigate(`/profile/${user?._id}`);
            } 
          });
      }

    return (
       <section className="post-details">
        <div className="post-details-image-wrapper">
            <img src={ file ? 
                URL.createObjectURL(file) 
                : post?.image.url} alt="" className="post-details-image" 
                />

           { user?._id === post?.user._id && (
             <form 
             onSubmit={updateUserImageSubmitHandler} 
             className="update-post-image-form"
             >
             <label 
                 htmlFor="file" 
                 className="update-post-leabel">
                 <i className="bi bi-image-fill">
                     Select new image
                 </i>
             </label>
             <input 
                 style={{display: 'none'}} 
                 type="file" name="file"
                 id="file"
                 onChange={(e) => setFile(e.target.files[0])} 
              />
             <button type="submit"> Upload </button>
         </form>
           )}
        </div>

        <h1 className="post-details-title">
                {post?.title}
         </h1>
        
        <div className="post-details-user-info">
            <img    src={post?.user.profilePhoto?.url} 
                    alt=""  
                    className="post-details-user-image" 
            />
            <div className="post-details-user">

                <strong>
                    <Link to={`profile/${post?.user._id}`} className="user-name" >
                        {post?.user.username}
                    </Link>
                </strong>
                <span>{new Date(post?.createdAt).toString()}</span>
            </div>
        </div>
        <p className="post-details-description">
            {post?.description}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe iste laboriosam explicabo odit quibusdam quas voluptatum excepturi nulla, perferendis ex? Dignissimos odio libero error ex exercitationem quos sed nesciunt harum!
        </p>
        <div className="post-details-icon-wrapper">
            <div>
                { user && (

                       <> 
                    <div
                     onClick={() => dispatch(toggleLikePost(post?._id))}
                     className={post?.likes?.includes(user?._id) ? 
                                "bi" : "up"
                            }>  
                            <small>  Like </small>
                            </div>
                            </>
                            
                )}

                <small>{ post?.likes?.length } likes</small>
            </div>
            { user?._id === post?.user._id && (
            <div>
                <i onClick={(e) => setUpdatePost(true)} className="bi bi-pencil-square">Update Post</i>
                <i onClick={deletePostHundler} className="bi bi-trash-fill">Delete Post</i>
            </div>
            )}
        </div>
        { user ? 
        <AddComment postId={post?._id}/> :
        <p className="post-details-info-write"> To write a comment pleasse login </p>
        }
        <CommentList comments={post?.comments} />
        {updatePost && ( <UpdatePost post={post} setUpdatePost={setUpdatePost}/> )}
        
       </section>
    );
};

export default PostDetails;
