import React, { Component } from "react";
import {signupcompletionstep} from "../auth/auth";
import {useLocation,Link} from "react-router-dom";
class Signupcompletionstep extends Component{
      constructor(){
       super();
       this.state = {
        name : "",
        password : "",
        token:"",
        error : "",
        open:false,
      
       };
      }
      handleSubmit =  (event) =>{
      event.preventDefault();
      const {name,password,token} = this.state
      const signUpLink = token;
      const user = {
       signUpLink,
       name,
       password
      };
     signupcompletionstep(user)
      .then((data)=>{
        if(data.error){
          this.setState({
            error:data.error
          });
        }
        else{
          this.setState({
          error:"",
          name:"",
          token:"",
          password:"",
          open:true
          });
        }

      })
      .catch((err)=>{
        this.setState({error:err});
      })
     
    }
    componentDidMount(){
         const token = this.props.location.pathname.split("/")[2];
       this.setState({token});
       console.log(token);
    }
     
   

      handleChange = (name) => (event) =>{
        event.preventDefault();
           this.setState({
            [name]:event.target.value,
            error:"",
            open:false
           });
        
      }
      SignupForm = (name,password) =>{
      
        return (
          <form onSubmit={this.handleSubmit}>
           <div className="md-form mt-3">
            <label >Name</label>
            <input className="form-control" 
            type="text" 
            value={name}
            onChange={this.handleChange("name")}/>
          </div>
          <div className="md-form mt-3">
            <label >Password</label>
            <input  className="form-control" 
            type="password" 
            value={password}
            onChange={this.handleChange("password")}/>
          </div>
          <button className="btn btn-raised btn-secondary mt-3">Submit</button>
       </form>
        );
      }
      render(){
        const {name,password,error,open} = this.state;
        if(open){
            return (
                <div  style={{marginLeft:"5rem",marginRight:"5rem",color:"white"}}>
                <p className=" mt-5"  style={{color:"white"}}>
                    Sign Up successful. <Link to={`/signin`} style={{color:"white"}}><u>Sign In</u></Link>
                     </p>
                 </div>
            )
        }
      return (
        <div className="container "  style={{color:"white"}}>
           <h2 className="mt-5 mb-5"  style={{color:"white"}}>Sign Up</h2>
          { error?<div className=""  style={{color:"white"}}>
            {error}
           </div> :<></>}
          
          {this.SignupForm(name,password)}
        </div>
      );
      }


}
const withLocation = Component => props =>{
    const location = useLocation();
    return <Component {...props} location={location}/>
}
export default withLocation(Signupcompletionstep);