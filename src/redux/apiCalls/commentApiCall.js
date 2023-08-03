import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
           dispatch(postActions.addCommentPost(data));

        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error)
        }

    }
}


export function updateCommentPost(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.updateCommentPost(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}


export function deleteCommentPost(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
                dispatch(commentActions.deleteComment(commentId));
                dispatch(postActions.deleteCommentFromPost(commentId));
                
           

        } catch (error) {
          toast.error(error.response.data.message)
          console.log(error)
        }

    }
}

export function featchAllCommentPost() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(commentActions.setComments(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}