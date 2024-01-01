import React, { Component } from "react";
import {isAuthenticated} from "../auth/auth";

import {Navigate, useLocation} from "react-router-dom";
import { updatePost,singlepost } from "./apiPost";
import Load from "../LoadingComponent";
import defaultPost0 from "../images/defaultPost0.png";
import defaultPost1 from "../images/defaultPost1.png";
import defaultPost2 from "../images/defaultPost2.png";
import defaultPost3 from "../images/defaultPost3.png";
import defaultPost4 from "../images/defaultPost4.png";
class EditPost extends Component{
      constructor(props){
        super(props);
        this.state = {
            _id:"",
            redirectToProfile:false,
            error:"",
            title:"",
            body:"",
            fileSize:0,
            loading:true,
            x:'0',
            postData:undefined
           
           
        } 
      }
      init = (postId) =>{
           
             singlepost(postId)
             .then((data)=>{
                  if(data.error){console.log(data.error);this.setState({error:data.error,loading:false})}
                  else{
                    this.setState({
                        _id:data._id,
                        title:data.title,
                        body:data.body,
                        loading:false
                        
                    });
                   
                  }
                })
                .catch((err)=>{
                    console.log(err);
                    this.setState({error:err,loading:false})
                })




      }
      componentDidMount(){
       
      this.postData = new FormData();
        const id = this.props.location.pathname.split("/")[3];
       
        const x =this.props.location.search[1];
        this.setState({x});
        this.init(id);
      
     
     }
     valid = () =>{
      const {title,body,fileSize} = this.state;   
      if(fileSize>500000){this.setState({error:"File size should be less than 500kb"});return 0;}
      if(title.length === 0){
        this.setState({error:"Title is required"}); return 0;
      }
      if(body.length ===0 || body.length > 400){
          this.setState({error:"Body must be between 1 to 400 characters"});return 0;
      }
      return true;
     }
    
   
     handleSubmit =  (event) =>{
      event.preventDefault();
     
      const {_id} = this.state
    
       
      if(this.valid()===true){
       
        this.setState({loading:true});
   
     
  
      const token = isAuthenticated().token;
    
     updatePost(_id,token,this.postData)
      .then((data)=>{
        console.log(data);
        if(!data){
            this.setState({
                loading:false
            })
        }
        if(data.error){
          this.setState({
          error:data.error,
          loading:false
          });
        }
        else{
         
          this.setState({
           redirectToProfile:true,
           loading:false
          
          });
        }

      })
      .catch((err)=>{
        console.log(err);
        this.setState({loading:false,error:err});
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
     editPostForm = (title,body) =>{
      
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
        <button className="btn btn-raised btn-secondary mt-3">Update Post</button>
     </form>
      );
    }
     render(){
      const {_id,redirectToProfile,error,loading,title,body,x} = this.state;
      if(loading){
        return (<div className="jumbotron">
        <h2 className="text-center" style={{display:"flex",justifyContent:"center",marginTop:"150px"}}>
            <Load/>
        </h2>

    </div>)
      }
      if(redirectToProfile){
        return (
          <Navigate to={`/`}/>
        )
      }
     const photoUrl = _id? `${process.env.REACT_APP_API_URL}/preload/post/photo/${_id}?${new Date().getTime()}` : "";
     let postx = defaultPost0;
     if(x==='1'){
       postx=defaultPost1;
      }
      else if(x==='2'){
          postx=defaultPost2;
      }
      else if(x==='3'){
          postx = defaultPost3;
      }
      else if(x==='4'){
          postx = defaultPost4;
      }
         return (
           <div className="container" style={{color:"white"}}>
             <h2 className="mt-5 mb-5">Edit Profile</h2>
             { error?<div className="alert alert-danger">
            {error}
           </div> :<></>}
          
           <img 
            className="img-thumbnail" 
            style={{width:"300px",height:"auto"}}
            src={photoUrl} alt={title}
            onError={i=>i.target.src=`${postx}`}
            ></img>
            {this.editPostForm(title,body)}


           </div>

         )
     }


    }

const withLocation = Component => props =>{
    const location  = useLocation();

     
       return <Component {...props} location={location}/>

}
export default withLocation(EditPost);