import React, { useState } from 'react';
import "./update-profile.css";
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/apiCalls/profileApiCall';



const UpdateProfile = ({ setUpdateProfile, profile }) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword ] = useState("");

    const formSubmitUpdateHandler = (e) => {
        e.preventDefault()

        const updatedUser = { username, bio }

        if (password.trim() !== "") {
            updatedUser.password = password
         }

       dispatch(updateProfile(profile?._id, updatedUser))
       setUpdateProfile(false)
    }
    return (
        <div className="update-profile">
            <form onSubmit={formSubmitUpdateHandler}  className="update-profile-form">
                <abbr title="close">
                    <i onClick={() => setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close">x</i>
                </abbr>
                <h1 className="update-profile-title">Update Profile</h1>
                <>
                <input 
                    type="text"
                    className="update-profile-input" 
                    value={username}
                    placeholder='UserName'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input 
                    type="text"
                    className="update-profile-input" 
                    value={bio}
                    placeholder='Bio'
                    onChange={(e) => setBio(e.target.value)}
                />
                <input 
                    type="password"
                    className="update-profile-input" 
                    value={password}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </>
                    <button onClick={() => setUpdateProfile(false)} type="submit" className="update-profile-btn">
                        Update Profile
                    </button>
            </form>
        </div>
    );
};

export default UpdateProfile;