import { useEffect } from 'react';
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import  swal  from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentPost, featchAllCommentPost } from '../../redux/apiCalls/commentApiCall';


const CommentsTable = () => {

    
    const dispatch = useDispatch()
    

    
    const { comments } = useSelector(state => state.comment)

       // delete comments Hundler 
       const deleteCommentsHundler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deleteCommentPost(commentId))
            } 
          });
      }


      useEffect(() => {
        dispatch(featchAllCommentPost())
      }, [])


    return (
       <sectiom className="table-container">
        <AdminSidebar />
        <div className="table-wrapper">
            <h1 className="table-title">
                Commentss
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Acthion</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="table-image">
                                    <img 
                                        src={item.user.profilePhoto?.url} 
                                        alt=""
                                        className="table-user-image"
                                         
                                    />
                                    <span className="table-username">
                                     {item.user.username}
                                    </span>
                                </div>
                            </td>
                            <td>
                                {item.text}
                            </td>
                            <td>
                                <div className="table-button-group">
                                    <button onClick={() => deleteCommentsHundler(item._id)}>
                                        Delete Comment
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </sectiom>
    );
};

export default CommentsTable;