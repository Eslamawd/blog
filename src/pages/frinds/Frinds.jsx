import "../admin/admin-table.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import  swal  from "sweetalert";
import { frindOkRequist, getRequistFrinds, deleteRequist } from '../../redux/apiCalls/frindsApiCalls';
import { useNavigate } from "react-router-dom";

const Frinds = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { requist } = useSelector(state => state.profile)


    const goToRequistProfile = (id) => {
        navigate(`/profile/${id}`)
    }


    
    const addToFrinds = (id) => {
        dispatch(frindOkRequist(id))
    }

    const deletedRequist = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Requist!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deleteRequist(id))
            } 
          });
      }

      useEffect(() => {
        dispatch(getRequistFrinds())
}, [dispatch])


    return (
        
       <section className="table-container">
            <div className="table-wrapper">
            <h1 className="table-title">
               Requist {requist.length}
            </h1>
        <table className="table">
             <tbody>

                    {requist.map((item, index) => (
                        <tr key={item._id}>
                            <td onClick={() => goToRequistProfile(item._id)}>
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
                            <td>
                                <div className="table-button-group">
                                    <button onClick={() => addToFrinds(item._id)}>
                                            Frinds
                                    </button>
                                    <button onClick={() => deletedRequist(item._id)}>
                                        Delete
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

export default Frinds;