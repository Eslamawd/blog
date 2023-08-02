import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCalls";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (email.trim() === "") return toast.error("pleasse your Email")
        if (password.trim() === "") return toast.error("pleasse your Password and 8 caracts")

        dispatch(loginUser({ email, password }));
    }


    return (
        <div>
            <section className="form-container">
                <h1 className="form-title"> Login Account</h1>
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
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="form-input"
                            id="password"
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="form-btn" type="submit">
                        Login
                    </button>
                </form>
                <div className="form-footer">
                    Did you forget password? <Link to="/forget-password">forget password</Link>
                </div>
            </section>
        </div>
    );
};

export default Login;