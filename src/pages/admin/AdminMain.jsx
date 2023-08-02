import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddCategory from './AddCategory';
import { useSelector, useDispatch } from "react-redux";
import { featchCategories } from '../../redux/apiCalls/categoryApiCall';
import { getUserCount } from '../../redux/apiCalls/profileApiCall';
import { getPostCount } from '../../redux/apiCalls/postApiCall';
import { featchAllCommentPost } from '../../redux/apiCalls/commentApiCall';

const AdminMain = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category);
    const { usersCount } = useSelector(state => state.profile);
    const { postsCount } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comment);


    useEffect(() => {
            dispatch(featchCategories());
            dispatch(getUserCount());
            dispatch(getPostCount());
            dispatch(featchAllCommentPost());
    }, [])

    return (
        <div className="admin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count">{usersCount}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            className="admin-card"
                             to="/admin/users-table">
                        See ALL User
                        </Link>
                        <div className="admin-card-link">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Posts</h5>
                    <div className="admin-card-count">{postsCount}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            className="admin-card"
                             to="/admin/posts-table">
                        See ALL Posts
                        </Link>
                        <div className="admin-card-link">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">{categories?.length}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            className="admin-card"
                             to="/admin/categories-table">
                        See ALL Categories
                        </Link>
                        <div className="admin-card-link">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Commemts</h5>
                    <div className="admin-card-count">{comments?.length}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            className="admin-card"
                             to="/admin/comments-table">
                        See ALL Comments
                        </Link>
                        <div className="admin-card-link">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategory />

        </div>
    );
};

export default AdminMain;