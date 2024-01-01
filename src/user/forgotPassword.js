import React, { Component } from "react";
import {useLocation} from "react-router-dom";
import { forgotPassword } from "../auth/auth";
class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            error:"",
            message:""
        }

    }
    handleChange =(e) =>{
        this.setState({email:e.target.value});
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        forgotPassword(this.state.email)
        .then((resp)=>{
            if(resp.error){
                this.setState({error:resp.error});
                 return 0;
            }
            else{
                this.setState({message:"Email will be sent to your registered email in a minute"});
            }
        })
        .catch((err)=>{
            this.setState({error:err});
        })

    }
    render(){
        const {error,message} = this.state;
       
        if(message){
            return (<p className="" style={{marginLeft:"5rem",
            marginRight:"5rem",marginTop:"5rem",color:"white"}}>{message}</p>)
        }
        return (
            <div style={{color:"white"}}>

                <h2 style={{textAlign:"center",marginTop:"5rem",marginBottom:"5rem"}}>Reset Password</h2>
             { error?
             (<p className="alert alert-danger" style={{marginLeft:"5rem",marginRight:"5rem"}}>{error}</p>):<></>
        }
             <form onSubmit={this.handleSubmit} style={{marginLeft:"5rem",marginRight:"5rem"}}>
          <div className="md-form mt-3">
            <label className="" style={{fontWeight:"bold",fontSize:"25px"}}>Email</label>
            <input className="form-control" 
            type="email" 
            value={this.state.email}
            onChange={this.handleChange}/>
          </div>
          <button className="btn btn-raised btn-secondary mt-3">Submit</button>
       </form>
            </div>
        )
    }




};
const withLocation = Component => props =>{
    const location = useLocation();
    return <Component {...props} location={location}/>
}
export default withLocation(ForgotPassword);