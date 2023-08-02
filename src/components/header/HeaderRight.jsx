import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";

const HeaderRight = () => {
    
    const { user } = useSelector(state => state.auth);
    const [dropDown, setDropDown] = useState(false)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        setDropDown(false);
        dispatch(logoutUser());
    };



    return (
        <div className="header-right">
            {user ? (
            <>
            <div className="header-right-user-info">
                <span
                    onClick={() => setDropDown(prev => !prev)}
                     className="header-right-username">
                    {user?.username}
                </span>
                <img 
                    src={user?.profilePhoto.url} 
                    alt="" 
                    className="header-right-user-photo"
                 />
                 {dropDown && (
                                     <div className="header-right-user-dropdon">
                                     <Link
                                        onClick={() => setDropDown(prev => !prev)} 
                                        to={`/profile/${user?._id}`} 
                                        className="header-dropdown-item">
                                         <i className="bi bi-file-person"></i>
                                         <span>Profile</span>
                 
                                     </Link>
                                     <div onClick={logoutHandler} className="header-dropdown-item">
                                         <i className="bi bi-box-arrow-in-left"></i>
                                         <span>LogOut</span>
                                     </div>
                                  </div>
                 
                 ) }
            </div>
            </>
             )
            : 
            (

                 <>
                    <Link to="/login" className="header-right-link">
                      <i class="bi bi-box-arrow-right"></i>
                             <span>Login</span>
                     </Link>
                    <Link to="/signup" className="header-right-link">
                     <i class="bi bi-person-plus-fill"></i>
                         <span>Sign up</span>
                    </Link>
                 </> 
            )}
    </div>
    );
};

export default HeaderRight;