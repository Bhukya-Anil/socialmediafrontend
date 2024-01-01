import React, { Component } from "react";
import {addcomment,uncomment} from "./apiPost";
import {isAuthenticated} from "../auth/auth";
import DefaultProfile from "../images/avatar.png"
import {Link} from "react-router-dom"
class Comment extends Component{
     constructor(props){
        super(props);
        this.state = {
            text:"",
            error:"",
            loading:true
        }
     }
     valid = () =>{
        const {text} = this.state;
        if(text.length>150 || text.length<1){
            this.setState({error:"Comment should be non empty and should  have less than 150 characters"});return 0;}
        return 1;
     }
     handleSubmit = (e) =>{
        e.preventDefault();
        if(!isAuthenticated()){ this.setState({error:"Please SignIn to leave a comment"});return 0;}
        if(this.valid()===1){
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const comment = {text:this.state.text};
  addcomment(userId,token,this.props.postId,comment)
  .then((post)=>{
    if(post.error){
        console.log(post.error);
    }
    else{
        this.setState({text:""});
        this.props.commentadding(post.comments);

    }
  })
}   
     }
     deleteComment = (comment) =>{
        if(window.confirm("Are you sure to delete comment?")){
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
          uncomment(userId,token,this.props.postId,comment)
          .then((data)=>{
            if(data.error){
                console.log(data.error);
            }
            else{

                this.props.commentadding(data.comments);
            }
          })
          .catch((err)=>{
            console.log(err);
          })
        }
 
     }
     handleChange = (event) =>{
        this.setState({text:event.target.value,error:""});
     }
    render(){
              const userPhotourl = isAuthenticated()?`${process.env.REACT_APP_API_URL}/preload/user/photo/${isAuthenticated().user._id}`:"";
              let comments = this.props.comments.reverse();
           const {error} = this.state;

          return (
            <div style={{marginLeft:"5rem",marginTop:"5rem",color:"white"}}>
                <h2 >Leave a comment</h2>
            <form className="form" onSubmit={this.handleSubmit}>
               <div className="form-group">
                <div className="d-flex"  style={{marginTop:"2rem"}}>
               <img 
               src={userPhotourl}
               onError={i=>i.target.src=`${DefaultProfile}`}
               alt=""
               className="float-left "
               height={"40px"} 
               width={"40px"}
               
               style={{marginRight:"10px",borderRadius:"50%",
               marginBottom:"1rem",border:"2px solid black"}}
               ></img>
               <input type="text" 
               style={{width:"-webkit-fill-available",borderTop:"0px",height:"40px",
               borderLeft:"0px",borderRight:"0px",margin:"0px",outline:"none",marginRight:"5rem"
              ,borderRadius:"10px",fontSize:"20px"}}
              value={this.state.text}
               onChange={this.handleChange}></input>
               </div>
               <button type="submit" className="btn btn-raised btn-success " 
               style={{marginLeft:"3rem"}}>POST</button>
               </div>
               {(error === "")?<></>:<p className="alert alert-danger mt-2" 
               style={{marginRight:"5rem"}}
               >{error}</p> } 
            </form>
            <h3 style={{marginLeft:"1rem",marginTop:"2rem",marginBottom:"2rem"}} >
                {comments.length} Comments
                </h3>
                <hr/>
                    {
                    comments.map((comment,i)=>{
                    return ( <div key={i} >
                        <div className="row" style={{marginBottom:"1rem",marginRight:"2rem"}}>
                            <Link to={comment.postedBy? `/user/${comment.postedBy._id}`:`/post/${this.props.postId}`} style={{display:"flex"}}
                            
                            >
                                <img
                                className="float-left "
                                height={"40px"} 
                                width={"40px"}
                                
                                style={{marginRight:"10px",borderRadius:"50%",
                                marginBottom:"1rem",border:"2px solid black"}}
                                src={comment.postedBy?`${process.env.REACT_APP_API_URL}/preload/user/photo/${comment.postedBy._id}`:""}
                                alt={"Unknown"}
                                onError={i=>i.target.src=`${DefaultProfile}`}

                                ></img>
                                <div >
                                    <h5 className="hfx" style={{marginLeft:"3rem",color:"white"}}>{comment.text}</h5>
                                </div>
                        
                            </Link>
                            <div style={{display:"inline"}}>
                            <p className="fst-italic mark d-flex" style={{justifyContent:"space-between",backgroundColor:"transparent"}}>
                              <p style={{fontWeight:"5px",fontSize:"15px",
                              marginLeft:"5rem"}}> Commented by  {comment.postedBy?<Link to={`/user/${comment.postedBy._id}?`} style={{color:"white",textUnderlineOffset:"1px"}}>
                              <u> { comment.postedBy.name }{" "}</u> </Link>:" Unknown "}
                              on  {new Date(comment.created).toDateString()}
                              </p> 
                              {comment.postedBy && isAuthenticated() && (isAuthenticated().user._id === comment.postedBy._id) &&
                               (
                                <div style={{float:"right"}}>
                               <button className="btn btn-raised btn-danger" onClick={()=>this.deleteComment(comment)}>Delete Comment</button>
                                </div>

                               )}
                               </p>
                              
                               </div>
                            <hr/>
                        </div>
                       
                     </div>
                  )  })}
            </div>
          )

    }




};
export default Comment;