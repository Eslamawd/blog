import { useState , useEffect } from 'react';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getResetPassword, resetPassword } from '../../redux/apiCalls/passwordApiCall';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.password);
    const [password, setPassword] = useState("");

    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(getResetPassword(userId, token));
    }, [userId, token]);

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (password.trim().slice(7) === "") return toast.error("pleasse your Password and 8 caracts");

        dispatch(resetPassword(password, { userId, token }));
    }


    return (
       
            <section className="form-container">
            { isError ? (
                 <h1>Not Found</h1> ) : (
                 <>
                <h1 className="form-title"> ResetPassword Account</h1>
                <form onSubmit={formSubmitHandler} className="form">
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                          New  Password
                        </label>
                        <input 
                            type="password" 
                            className="form-input"
                            id="password"
                            placeholder="Enter your new password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="form-btn" type="submit">
                        Save
                    </button>
                </form>
                 </> )}
            </section>
    );
};

export default ResetPassword;