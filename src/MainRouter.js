import React from "react";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Signin from "./user/Signin";
import Profile from "./user/profile";
import User from "./user/User";
import EditUser from "./user/editUser";
import FindPeople from "./user/findPeople";
import NewPost from "./post/newPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/editPost";
import ForgotPassword from "./user/forgotPassword";
import ResetPassword from "./user/resetPassword";
import Signupfirststep from "./user/signupfirststep";
import Signupcompletionstep from "./user/signupcompletionstep";
const MainRouter = () =>{
  
  return (
       <div>
       <Menu/> 
        <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route  path="/signup-firststep" element={<Signupfirststep/>}/>
            <Route  path="/signup-completionstep/:token" element={<Signupcompletionstep/>}/>
            <Route  path="/signin" element={<Signin/>}/>
            <Route  path="/forgot-password" element={<ForgotPassword/>}/>
            <Route  path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route  path="/user/:userId" element={<Profile />}/>
            <Route exact path="/users" element={<User/>}/>
            <Route  path="/user/edit/:userId" element={<EditUser/>}/>
            <Route exact path="/findpeople" element={<FindPeople/>}/>
            <Route exact path="/post/create" element={<NewPost/>}/>
            <Route  path="/post/:postId" element={<SinglePost/>}/>
            <Route  path="/post/edit/:postId" element={<EditPost/>}/>
          
          
            
        </Routes>
        </div>
  );

};
export default MainRouter;
