import React from 'react';
import AdminSidebar from "./AdminSidebar";

import "./admin-table.css";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import  swal  from "sweetalert";
import { deleteProfile, getAllUserProfile } from '../../redux/apiCalls/profileApiCall';

const UsersTable = () => {

    const dispatch = useDispatch()
    const { profiles, isProfileDeleted } = useSelector(state => state.profile)


    useEffect(() => {
            dispatch(getAllUserProfile())
    }, [isProfileDeleted])

       // delete post Hundler 
       const deleteUserHundler = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             dispatch(deleteProfile(userId))
            } 
          });
      }
    return (
       <section className="table-container">
        <AdminSidebar />
        <div className="table-wrapper">
            <h1 className="table-title">
                Users
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Acthion</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="table-image">
                                    <img 
                                        src={item.profilePhoto?.url} 
                                        alt=""
                                        className="table-user-image"
                                         
                                    />
                                    <span className="table-username">
                                        {item.username}
                                    </span>
                                </div>
                            </td>
                            <td>{item.email}</td>
                            <td>
                                <div className="table-button-group">
                                    <button>
                                        <Link to={`/profile/${item._id}`}>
                                            View Profile
                                        </Link>
                                    </button>
                                    <button onClick={() => deleteUserHundler(item._id)}>
                                        Delete User
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </section>
    );
};

export default UsersTable;