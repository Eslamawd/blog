import React, { useState } from 'react';

import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/apiCalls/passwordApiCall';

const ForgetPassword = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");




    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") {
             return toast.error("pleasse your Email");
        }
        dispatch(forgotPassword(email));
    }


    return (
        <div>
            <section className="form-container">
                <h1 className="form-title"> ForgetPassword Account</h1>
                <form onSubmit={formSubmitHandler} className="form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input 
                            type="email" 
                            className="form-input"
                            id="email"
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
             
             <div>

                    <button className="form-btn" type="submit">
                        ForgetPassword
                    </button>
             </div>
                </form>
                <div className="form-footer">
                Did you forget password?
                </div>
            </section>
        </div>
    );
};

export default ForgetPassword;