import React, { Component } from "react";
import {Navigate,Link} from "react-router-dom";
import Load from "../LoadingComponent";
class Signin extends Component{
      constructor(){
       super();
       this.state = {
        email : "",
        password : "",
        error : "",
        redirectToReferer:false,
        loading:false
       
       };
      
      }
   
 authenticate = (jwt,next)=>{
    // console.log(jwt);
    if(typeof(window)){
     localStorage.setItem("jwt", JSON.stringify(jwt));
     next();
    }
 
   };
    handleSubmit =  (event) =>{
   event.preventDefault();
   this.setState({
     loading:true,error:""
   });
   const {email,password} = this.state
   const user = {
     email,
     password
 
   };
   this.signin(user)
   .then((data)=>{
     if(data.error){
       this.setState({
         error:data.error,loading:false
       });
     }
     else{
      // authenticate
      this.authenticate(data,()=>{
       this.setState({
         redirectToReferer:true
       })
      });
      //redirect
     }
 
   })
  
 }
  
   signin = (user) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/preload/signin`,{
     method:"POST",
     headers:{
       Accept:"application/json",
       "Content-Type" :"application/json"
 
     },
     body: JSON.stringify(user)
   }).then((res)=>{
         return res.json();
   })
   .catch((err)=>{
     console.log(err);
 
   })
    
 
     
 
 }
     

      handleChange = (name) => (event) =>{
        event.preventDefault();
           this.setState({
            [name]:event.target.value,
            error:"",
            open:false
           });
        
      }
      SigninForm = (password,email) =>{
      
        return (
          <form onSubmit={this.handleSubmit}  style={{color:"white"}}>
          <div className="md-form mt-3">
            <label >Email</label>
            <input className="form-control" 
            type="email" 
            value={email}
            onChange={this.handleChange("email")}/>
          </div>
          <div className="md-form mt-3">
            <label >Password</label>
            <input  className="form-control" 
            type="password" 
            value={password}
            onChange={this.handleChange("password")}/>
          </div>
          <button className="btn btn-raised btn-secondary mt-4">Submit</button>
          <Link className="btn btn-raised  btn-warning ms-4" to={`/forgot-password`}>Forgot Password?</Link>
       </form>
        );
      }
      render(){
        const {password,email,error,redirectToReferer,loading} = this.state;
        if(redirectToReferer){
          return <Navigate to="/"/>
        }
        if(loading){
          return (
            <div className="jumbotron mt-5">
                    <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
                       <Load/>
                    </h3>

                </div>
          )
        }
      return (
        <div className="container ">
           <h2 className="mt-5 mb-5"  style={{color:"white"}}>Sign In</h2>
          { error?<div className="alert alert-danger">
            {error}
           </div> :<></>}
           {loading?
           <div className="jumbotron text-center">
            <h2>Loading...</h2>
           </div>:<></>}
          {this.SigninForm(password,email)}
           
        </div>
      );
      }


}
export default Signin;