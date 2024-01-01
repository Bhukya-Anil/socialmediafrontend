import React, { Component } from "react";
import {signupfirststep} from "../auth/auth";
import Load from "../LoadingComponent";
class Signupfirststep extends Component{
      constructor(){
       super();
       this.state = {
        name : "",
        email : "",
        password : "",
        error : "",
        open:false,
        loading:false,
      
       };
      }
      handleSubmit =  (event) =>{
      event.preventDefault();
      this.setState({loading:true});
      const {email} = this.state
      const user = {
       email
      };
     signupfirststep(user)
      .then((data)=>{
        if(data.error){
          this.setState({
            error:data.error,loading:false
          });
        }
        else{
          this.setState({
          error:"",
          email:"",
          open:true,loading:false
          });
        }

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
      SignupForm = (email) =>{
      
        return (
          <form onSubmit={this.handleSubmit}  style={{color:"white"}}>
          <div className="md-form mt-3">
            <label   style={{color:"white"}}>Email</label>
            <input className="form-control" 
            type="email" 
            value={email}
            onChange={this.handleChange("email")}/>
          </div>
          <button className="btn btn-raised btn-secondary mt-3">Verify Email</button>
       </form>
        );
      }
      render(){
        const {email,error,open,loading} = this.state;
        if(open){
            return (
                <div  style={{marginLeft:"5rem",marginRight:"5rem"}}>
                <p className=" mt-5"  style={{color:"white"}}>
                    Verfication Link has been sent to your email
                     </p>
                 </div>
            )
        }
        if(loading){
          return(
            <div className="jumbotron mt-5">
            <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
               <Load/>
            </h3>
        </div>
          )

        }
      return (
        <div className="container ">
           <h2 className="mt-5 mb-5"  style={{color:"white"}}>Sign Up</h2>
          { error?<div className="alert alert-danger">
            {error}
           </div> :<></>}
          
          {this.SignupForm(email)}
        </div>
      );
      }


}
export default Signupfirststep;