import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify"


export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`)
            dispatch(postActions.setPosts(data))

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}

export function getPostCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`)
            dispatch(postActions.setPostsCount(data))

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}


export function getPostCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`)
            dispatch(postActions.setPostsCat(data))

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}

export function createPost(newPost) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading())
            const { data } = await request.post(`/api/posts`, newPost , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(postActions.setPostCreated(data))
            setTimeout(() => dispatch(postActions.clearPostCreated()), 3000)

        } catch (error) {
          toast.error(error.response.data.message)
          dispatch(postActions.clearLoading())
        }

    }
}


export function fetchPost(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}

export function toggleLikePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,

                }
            });
           await dispatch(postActions.setLike(data));

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}

export function updatePostImage(newImage, postId) {
    return async (getState) => {
        try {
             await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data",
                    
                }
            });
            toast.success("New post Image uploaded successfully");

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}
export function updatePost(newPost, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } =  await request.put(`/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    
                }
            })
            dispatch(postActions.setPost(data))

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}

export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } =  await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    
                }
            })
            dispatch(postActions.deletePost(data.postId))
            toast.success(data.message)

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}


export function getAllPosts() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`)
            dispatch(postActions.setPosts(data))

        } catch (error) {
          toast.error(error.response.data.message)
        }

    }
}