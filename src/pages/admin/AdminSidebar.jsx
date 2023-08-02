import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <Link to="/admin" className="admin-sidebar-title">
                <i className="bi bi-columns"></i>
                Dashboard
            </Link>
            <ul className="admin-dashboard-list">
                <Link className="admin-sidebar-link" to="/admin/users-table">
                    <i className="bi bi-person"></i>
                    Users
                </Link>
                <Link className="admin-sidebar-link" to="/admin/posts-table">
                    <i className="bi bi-file-post"></i>
                    Posts
                </Link>
                <Link className="admin-sidebar-link" to="/admin/categories-table">
                    <i className="bi bi-tag-fill"></i>
                    Categories
                </Link>
                <Link className="admin-sidebar-link" to="/admin/comments-table">
                    <i className="bi bi-chat-left-text"></i>
                    Comments
                </Link>
            </ul>

        </div>
    );
};

export default AdminSidebar;