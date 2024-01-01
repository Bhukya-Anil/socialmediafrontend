import React, { Component } from "react";
import {isAuthenticated} from "../auth/auth";
import {read,update} from "./apiUser";
import {Navigate, useLocation} from "react-router-dom";
import DefaultProfile from "../images/avatar.png"
import Load from "../LoadingComponent";
class EditUser extends Component{
      constructor(props){
        super(props);
        this.state = {
            _id:"",
            name :"",
            password:undefined,
            email:"",
            redirectToProfile:false,
            error:"",
            fileSize:0,
            loading:true,
            about:""
           
        } 
      }
      init = (userId) =>{
             const token = isAuthenticated().token;
             read(userId,token)
             .then((data)=>{
                  if(data.error){console.log(data.error);this.setState({error:data.error,loading:false})}
                  else{
                    this.setState({
                        _id:data._id,
                        name:data.name,
                        email:data.email,
                        about:data.about,loading:false
                        
                    });
                   
                  }
                })
                .catch((err)=>{
                    console.log(err);
                    this.setState({error:err,loading:false});
                })




      }
      componentDidMount(){
       
      this.userData = new FormData();
        const id = this.props.location.pathname.split("/")[3];
      
       this.init(id);
      
     
     }
     valid = () =>{
      const {name,password,fileSize} = this.state;   
      if(fileSize>500000){this.setState({error:"File size should be less than 500kb"});return 0;}
      if(name.length === 0){
        this.setState({error:"Name is required"}); return 0;
      }
      if(password && password.length>=1 && (password.length<8  || password.length<15)){
          this.setState({error:"Password must be between 8 to 14 characters"});return 0;
      }
      return true;
     }
    
   
     handleSubmit =  (event) =>{
      event.preventDefault();
     this.userData.delete("email");
      const {_id} = this.state
    
       
      if(this.valid()===true){
       
        this.setState({loading:true});
   
     
  
      const token = isAuthenticated().token;
    
     update(_id,token,this.userData)
      .then((data)=>{
       
        if(data.error){
          this.setState({
          error:data.error,
          loading:false
          });
        }
        else{
          let temp = JSON.parse(localStorage.getItem("jwt"));
           temp.user.name = this.state.name;
         
          localStorage.setItem("jwt",JSON.stringify(temp));
          this.setState({
           redirectToProfile:true,
           loading:false
          
          });
        }

      })
    }
  }
    
     
     handleChange = (name) => (event) =>{
      event.preventDefault();
      
          const val = (name ==="photo") ? event.target.files[0] : event.target.value ;
          if(name === "photo"){this.setState({fileSize:event.target.files[0].size});
          
        }
        
          this.userData.set(name,val);
         this.setState({
          [name]:val,
          error:""
         
         });
      
    }
     editProfileForm = (name,password,about) =>{
      
      return (
        <form onSubmit={this.handleSubmit}>
           <div className="md-form mt-3">
          <label className="">Photo</label>
          <input className="form-control" 
          type="file"
          accept="image/*"
           onChange={this.handleChange("photo")}/>
        </div>
        <div className="md-form mt-3">
          <label className="">Name</label>
          <input className="form-control" 
          type="text"
          value={name}
           onChange={this.handleChange("name")}/>
        </div>
        <div className="md-form mt-3">
          <label className="">About</label>
          <input className="form-control" 
          type="text"
          value={about}
           onChange={this.handleChange("about")}/>
        </div>
        <div className="md-form mt-3">
          <label className="">Password</label>
          <input className="form-control" 
          type="password" 
          value={password}
          onChange={this.handleChange("password")}/>
        </div>
       
        <button className="btn btn-raised btn-secondary mt-3">Update</button>
     </form>
      );
    }
     render(){
      const {_id,name,redirectToProfile,password,error,loading,about} = this.state;
      if(loading){
        return ( <div className="jumbotron mt-5">
        <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
           <Load/>
        </h3>

    </div>)
      }
      if(redirectToProfile){
        return (
          <Navigate to={`/user/${_id}`}/>
        )
      }
     const photoUrl = _id? `${process.env.REACT_APP_API_URL}/preload/user/photo/${_id}?${new Date().getTime()}` : DefaultProfile;
  
         return (
           <div className="container" style={{color:"white"}}>
             <h2 className="mt-5 mb-5">Edit Profile</h2>
             { error?<div className="alert alert-danger">
            {error}
           </div> :<></>}
          
           <img 
            className="img-thumbnail" 
            style={{width:"300px",height:"auto"}}
            src={photoUrl} alt={name}
            onError={i=>i.target.src=`${DefaultProfile}`}
            ></img>
            {this.editProfileForm(name,password,about)}


           </div>

         )
     }


    }

const withLocation = Component => props =>{
    const location  = useLocation();

     
       return <Component {...props} location={location}/>

}
export default withLocation(EditUser);