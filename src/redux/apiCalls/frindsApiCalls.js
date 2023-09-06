import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";



export function getRequistFrinds() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/frind/requi`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setRequist(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}
export function newRequistFrinds(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/frind/requi/${id}`, {},  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

           await dispatch(profileActions.setRequistProfile(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}



export function getAllFrinds() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/frind/frinds`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setFrinds(data));

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}


export function deleteRequist(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/frind/frinds/${id}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            toast.success(data?.message);
            dispatch(profileActions.deleteRequist(data))

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}


export function frindOkRequist(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/frind/frinds/${id}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
          await dispatch(profileActions.setFrinds(data))
          await dispatch(authActions.setFrinds(data))

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
}



export function deleteOneRequist(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/frind/frinds/${id}`, {},  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(authActions.clearReq(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}
export function deleteSend(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/frind/frinds/${id}`, {},  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setRequistProfile(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}


export function deleteOneFrinds(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/frind/frinds/${id}`,  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(authActions.setFrinds(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}

export function deleteFrinds(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/frind/frinds/${id}`,  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.deleteFrinds(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}