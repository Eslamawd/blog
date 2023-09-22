import request from "../../utils/request";
import { messageActions } from "../slices/MessageSlice";
import { toast } from "react-toastify";

export function newMessageOn(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/chats/${id}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

           await dispatch(messageActions.setMessage(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}
export function getChatMe() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/chats/`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

           await dispatch(messageActions.setChat(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}
export function getNewMessage(message) {
    return async (dispatch, getState) => {
        try {
           

           await dispatch(messageActions.setNewMessage(message));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}