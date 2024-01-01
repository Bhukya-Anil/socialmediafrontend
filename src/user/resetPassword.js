import React, { Component } from "react";
import {useLocation,Link} from "react-router-dom";
import { resetPassword } from "../auth/auth";
class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            password:"",
            confirmpassword:"",
            error:"",
            flag:0,
            resetLink:""
        }

    }
    handleChange =(name)=> e =>{
        this.setState({[name]:e.target.value});
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.confirmpassword !== this.state.password){
            this.setState({error:"password and confirm password does not match"});
            return 0;
        }
        resetPassword(this.state.resetLink,this.state.password)
        .then((resp)=>{
            if(resp.error){
                this.setState({error:resp.error});
                 return 0;
            }
            else{
                localStorage.removeItem("jwt");
                this.setState({flag:1});
            }
        })
        .catch((err)=>{
            this.setState({error:err});
        })

    }
    componentDidMount(){
        const url = this.props.location.pathname.split("/")[2];
       this.setState({resetLink:url});
    }
    render(){
        const {error,flag} = this.state;
       
        if(flag){
            return (<p className="" style={{marginLeft:"5rem",marginRight:"5rem",marginTop:"5rem",color:"white"}}>
                Password Reset Successful.. <Link to={`/signin`} style={{color:"white"}}><u>Sign In</u></Link></p>)
        }
        return (
            <div style={{color:"white"}}>

                <h2 style={{textAlign:"center",marginTop:"5rem",marginBottom:"5rem"}}>Reset Password</h2>
             { error?
             (<p className="alert alert-danger" style={{marginLeft:"5rem",marginRight:"5rem"}}>{error}</p>):<></>
        }
             <form onSubmit={this.handleSubmit} style={{marginLeft:"5rem",marginRight:"5rem"}}>
          <div className="md-form mt-3">
            <label className="" style={{fontWeight:"bold",fontSize:"25px"}}>New Password</label>
            <input className="form-control" 
            type="password" 
            value={this.state.password}
            onChange={this.handleChange("password")}/>
          </div>
          <div className="md-form mt-3">
            <label className="" style={{fontWeight:"bold",fontSize:"25px"}}>Confirm Password</label>
            <input className="form-control" 
            type="password" 
            value={this.state.confirmpassword}
            onChange={this.handleChange("confirmpassword")}/>
          </div>
          <button className="btn btn-raised btn-secondary mt-3">Reset Password</button>
       </form>
            </div>
        )
    }




};
const withLocation = Component => props =>{
    const location = useLocation();
    return <Component {...props} location={location}/>
}
export default withLocation(ResetPassword);