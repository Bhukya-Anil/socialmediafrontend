import React, { Component } from "react";
import { isAuthenticated } from "../auth/auth";
import {remove} from "./apiUser";
import {signout} from "../auth/auth";
import { Navigate } from "react-router-dom";
class DeleteUser extends Component{
           constructor(props){
            super(props);
            this.state = {
                _id : this.props._id,
                redirect:false
            }
           }
           deleteConfirmed = () =>{
            let ans = window.confirm("Are you sure to delete your account ? ");
            if(ans){
                this.deleteAccount();

            }

           }
          deleteAccount = () =>{
           const user_id = this.state._id;
           const token = isAuthenticated().token;
           remove(user_id,token)
           .then((data)=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                signout(()=>{
                    console.log("User is deleted");
                });
                localStorage.removeItem("jwt");
                this.setState({redirect:true})
            }

           })
           .catch((err)=>{
            console.log(err);
           })
          

           }
           render(){
            if(this.state.redirect === true){
                return (<Navigate to="/"/>);
            }
              return(
                <button
                className="btn btn-raised btn-danger ml-5"
                onClick={this.deleteConfirmed}
                > Delete Profile 
                </button>
              )

           }




};
export default DeleteUser;