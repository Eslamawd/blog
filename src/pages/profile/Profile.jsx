import "./profile.css";
import PostItem from "../../components/post/PostItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import  swal  from "sweetalert";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall"
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
import { useParams, useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";


const Profile = () => {

    const dispatch = useDispatch();
    const { profile, loading, isProfileDeleted } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);

    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!file) return toast.error("pleasse select one photo")
        const formData = new FormData();
        formData.append("image", file);
        dispatch(uploadProfilePhoto(formData))
    };

     
    
    const { id } =  useParams();

    
    const isRequist = user?.requestFrinds?.find((user) => user === profile?._id)
    const isUserSend = user?.sendRequist?.find((user) => user === profile?._id)
    const isFrinds = user?.frinds?.find((user) => user === profile?._id)


    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0)
      }, [dispatch, id]);

      const navigate = useNavigate();
    useEffect(() => {
      if(isProfileDeleted) {
        navigate("/")
      }
      }, [navigate, isProfileDeleted]);



         // delete post Hundler 
        const deleteProfileHundler = () => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this profile!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((isOk) => {
                if (isOk) {
                  dispatch(deleteProfile(user?._id))
                  dispatch(logoutUser())
                }
              });
          };

          if (loading) {
            return(
              <div className="profile-loader">
              <MutatingDots 
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor= '#4fa94d'
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            </div>
            )
          }


    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                         src={ file? URL.createObjectURL(file): profile?.profilePhoto.url} 
                         alt=""  
                         className="profile-image"
                         />
                      
                      {user?._id === profile?._id  && (
                           <form onSubmit={formSubmitHandler}>
                           <abbr title="choose profile photo">
                               <label 
                                   htmlFor="file" 
                                   className="bi bi-camera-fill upload-profile-photo">o</label>
                           </abbr>
                           <input 
                               style={{display: "none"}}
                               type="file"
                               name="file"
                               id="file"
                               onChange={(e) => setFile(e.target.files[0])}
                                
                           />
                           <button type="submit" className="upload-profile-photo-btn">
                           Upload
                           </button>
                        </form>
                      )}
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                 {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span> {new Date(profile?.createdAt).toDateString()}</span>
                </div>
               {user?._id === profile?._id && (
                 <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                 <i className="bi bi-file-person-fill"></i>
                 Update Profile
                 </button>
               )}
               {isRequist &&
                <>
                 <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                 <i className="bi bi-file-person-fill"></i>
                 Accept
                 </button>
                 <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                 <i className="bi bi-file-person-fill"></i>
                 Cancel
                 </button>
                 </>}
               {isUserSend && (
                 <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                 <i className="bi bi-file-person-fill"></i>
                 Cancel
                 </button>
                 )}
               {isFrinds && (
                 <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                 <i className="bi bi-file-person-fill"></i>
                 Message
                 </button>
                 )}
                 {!isRequist || !isUserSend || !isFrinds || user?._id !== profile?._id ? (
                  <button className="profile-update-btn" onClick={() => setUpdateProfile(true)}>
                  <i className="bi bi-file-person-fill"></i>
                   Add Freind
                  </button>
                 ) :
                  null
                 }
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-list-title"> {profile?.username}Posts</h2>
               {
                profile?.posts?.map(post => 
                    <PostItem 
                        key={post._id} 
                        post={post}
                        username={profile?.username}
                        userId={profile?._id}
                    />)
               }
            </div>
           {user?._id === profile?._id && (
             <button onClick={deleteProfileHundler} className="delete-account-btn">
             Delete your account
         </button>
           )}

            {updateProfile && <UpdateProfile profile={profile} setUpdateProfile={setUpdateProfile} />}
        </section>
    );
};

export default Profile;