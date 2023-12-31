import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import io from 'socket.io-client';




import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import SignUp from "./pages/forms/SignUp";
import Post from "./pages/post/Post";
import Admin from "./pages/admin/Admin";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostTable from "./pages/admin/PostTable";
import CategoriesTable from "./pages/admin/CatigoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgetPassword from "./pages/forms/ForgetPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

import { useSelector } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import LayOut from "./pages/out-let/LayOut";
import Frinds from "./pages/frinds/Frinds";
import { useEffect, useState } from "react";
import Message from "./pages/frinds/Message";
import Chats from "./pages/frinds/Chats";


const socket = io('https://blog-api-61qi.onrender.com')


if (process.env.NODE_ENV === 'production') disableReactDevTools()

function App() {

  const { user } = useSelector(state => state.auth);
  const [requistFrind, setRequistFrind ] = useState([])
  const [onlineFrinds, setOnlineFrinds ] = useState([])

  
  useEffect(() => {
    const id = user?._id
    socket.on('connect', () => {
      socket.emit('roomNotfications', id)
    })
    socket.emit('goOnline', id)
    socket.emit('getOnlineFrinds', id)
    socket.on('newFrindRequist', data => {
      setRequistFrind((requist) => [ ...requist, data ])
     })
    socket.on('onlineFrinds', frinds => {
      setOnlineFrinds((online) => [ ...online, frinds ])

    })

     return () => {
       socket.disconnect()
     }
  },[user, onlineFrinds, requistFrind])
  console.log(requistFrind)
  console.log(onlineFrinds)

  requistFrind.map(user => 
  toast.success(`${user.username} Send A New Requist Frends`)
  )

  onlineFrinds.map(user => 
  toast.success(`${user.username} Send A New Requist Frends`)
  )

  

  





  return (
    <BrowserRouter>
     <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
             />

     <Routes>
     <Route path="/" element={ <LayOut requistFrind={requistFrind} /> }>
      <Route index element={ < Home /> }/>
      <Route path="login" element={!user ? < Login /> : <Navigate to="/" />} />
      <Route path="signup" element={!user ? < SignUp /> : <Navigate to="/" />} />
      <Route path="users/:userId/verify/:token/:a" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />
      <Route path="forget-password" element={< ForgetPassword />} /> 
      <Route path="reset-password/:userId/:token/:a" element={< ResetPassword />} /> 

      <Route path="profile/:id" element={ <Profile socket={socket} /> }/>
      <Route path="frinds" element={ <Frinds /> }/>
      <Route path="message/:id" element={ <Message socket={socket} /> }/>
      <Route path="chat" element={ <Chats /> }/>
      
      
      <Route path="posts">
         <Route index element={ <Post /> }/>
         <Route path="create-post" element={ user ? <CreatePost /> : <Navigate to="/" /> }/>
         <Route path="details/:postId" element={ <PostDetails /> }/>
         <Route path="categories/:category" element={ <Category /> }/>
      </Route>
      
      <Route path="admin">
      <Route index element={ user?.isAdmin?  <Admin /> : <Navigate to="/" />  }/>
      <Route path="users-table" element={ user?.isAdmin? <UsersTable /> : <Navigate to="/" />} />
      <Route path="posts-table" element={ user?.isAdmin? <PostTable /> : <Navigate to="/" />} />
      <Route path="categories-table" element={ user?.isAdmin? <CategoriesTable  /> : <Navigate to="/" />} />
      <Route path="comments-table" element={ user?.isAdmin? <CommentsTable /> : <Navigate to="/" />} />
      </Route>

      <Route 
        path="*"
        element={ < NotFound /> } 
      />
      </Route>

     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
