import React, { Component } from "react";
import {isAuthenticated} from "../auth/auth";
import {create} from "./apiPost";
import {Navigate, useLocation} from "react-router-dom";
import Load from "../LoadingComponent";
class NewPost extends Component{
      constructor(props){
        super(props);
        this.state = {
          title:"",
          body:"",
          photo:"",
          error:"",
          user:{},
          fileSize:0
           
        } 
      }
      componentDidMount(){
       
      this.postData = new FormData();
      this.setState({user:isAuthenticated().user});
      
     
     }
     valid = () =>{
      const {title,body,fileSize} = this.state;   
      if(fileSize>500000){this.setState({error:"File size should be less than 500kb"});return 0;}
      if(title.length === 0){
        this.setState({error:"Title is required",loading:false}); return 0;
      }
      if(body.length === 0){
          this.setState({error:"Body is required",loading:false});return 0;
      }
      return true;
     }
    
   
     handleSubmit =  (event) =>{
      event.preventDefault();
     
     
     
       
      if(this.valid()===true){
        this.setState({loading:true});
      const token = isAuthenticated().token;
      const id = isAuthenticated().user._id;
     create(id,token,this.postData)
      .then((data)=>{
       
        if(data.error){
          this.setState({
          error:data.error,
          loading:false
          });
        }
        else{
         console.log("New Post ", data);
          this.setState({
           redirectToProfile:true,
           loading:false,
           title:"",
           body:"",
           photo:""
          
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
        
          this.postData.set(name,val);
         this.setState({
          [name]:val,
          error:""
         
         });
      
    }
     PostForm = () =>{
      const {body,title} = this.state;
     
      return (
        <form onSubmit={this.handleSubmit} style={{color:"white"}}>
           <div className="md-form mt-3">
          <label className="">Photo</label>
          <input className="form-control" 
          type="file"
          accept="image/*"
           onChange={this.handleChange("photo")}/>
        </div>
        <div className="md-form mt-3">
          <label className="">Title</label>
          <input className="form-control" 
          type="text"
          value={title}
           onChange={this.handleChange("title")}/>
        </div>
        <div className="md-form mt-3">
          <label className="">Body</label>
          <input className="form-control" 
          type="text" 
          value={body}
          onChange={this.handleChange("body")}/>
        </div>
       
        <button className="btn btn-raised btn-secondary mt-3">Create Post</button>
     </form>
      );
    }
     render(){
      const {redirectToProfile,error,loading} = this.state;
      if(loading){
        return ( <div className="jumbotron mt-5">
        <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
           <Load/>
        </h3>

    </div>)
      }
      if(redirectToProfile){
        return (
          <Navigate to={`/user/${isAuthenticated().user._id}`}/>
        )
      }
    
         return (
           <div className="container" style={{color:"white"}}>
             <h2 className="mt-5 mb-5">Create A New Post</h2>
             { error?<div className="alert alert-danger">
            {error}
           </div> :<></>}
            {this.PostForm()}
           </div>

         )
     }


    }

const withLocation = Component => props =>{
    const location  = useLocation();

     
       return <Component {...props} location={location}/>

}
export default withLocation(NewPost);