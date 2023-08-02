import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./form.css";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/apiCalls/authApiCalls';
import swal from "sweetalert";


const SignUp = () => {

    const { registerMessage } = useSelector(state => state.auth)


    const dispatch = useDispatch() 

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (username.trim() === "") return toast.error("pleasse your Usernane")
        if (email.trim() === "") return toast.error("pleasse your Email")
        if (password.trim().slice(7) === "") return toast.error("pleasse your Password and 8 caracts")

        dispatch(registerUser({username, email, password}))
    }
    
    const navigate = useNavigate()


    if(registerMessage) {
        swal({
            title: registerMessage,
            icon: "succes"
        }).then(isOk => {
            if(isOk) {
                navigate("/login")
            }
        })
    }


    return (
        <div>
            <section className="form-container">
                <h1 className="form-title"> Create New Account</h1>
                <form onSubmit={formSubmitHandler} className="form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input 
                            type="text" 
                            className="form-input"
                            id="username"
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                        SignUp
                    </button>
                </form>
                <div className="form-footer">
                    Alrady have an account? <Link to="/login">Login</Link>
                </div>
            </section>
        </div>
    );
};

export default SignUp;<h1>new user</h1>