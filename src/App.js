import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
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
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";


if (process.env.NODE_ENV === 'production') disableReactDevTools()

function App() {


    const { user } = useSelector(state => state.auth);

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
     < Header />
     <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={  !user ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/users/:userId/verify/:token/%7D" element={  !user ? <VerifyEmail /> : <Navigate to="/" />} />
      <Route path="/forget-password" element={<ForgetPassword />} /> 
      <Route path="/reset-password/:userId/:token/%7D" element={<ResetPassword />} /> 

      <Route path="/profile/:id" element={ <Profile /> }/>
      
      <Route path="posts">
         <Route index element={ <Post /> }/>
         <Route path="create-post" element={ user ? <CreatePost /> : <Navigate to="/" /> }/>
         <Route path="details/:postId" element={ <PostDetails /> }/>
         <Route path="categories/:category" element={ <Category /> }/>
      </Route>
      
      <Route path="/admin">
      <Route index element={ user?.isAdmin?  <Admin /> : <Navigate to="/" />  }/>
      <Route path="users-table" element={ user?.isAdmin? <UsersTable /> : <Navigate to="/" />} />
      <Route path="posts-table" element={ user?.isAdmin? <PostTable /> : <Navigate to="/" />} />
      <Route path="categories-table" element={ user?.isAdmin? <CategoriesTable  /> : <Navigate to="/" />} />
      <Route path="comments-table" element={ user?.isAdmin? <CommentsTable /> : <Navigate to="/" />} />
      </Route>

      <Route path="*" element={<NotFound />} />

     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
