import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify"


export function featchCategories() {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/api/categories");
            dispatch(categoryActions.setCategories(data));

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}

export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.addCategory(data));
            toast.success("category created successfully");

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}


export function deleteOneCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`,  {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.deleteCategory(data.categoryId));
            toast.success(data.message);

        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }

    }
}