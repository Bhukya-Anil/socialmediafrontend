import React, { Component } from "react";
import { useLocation, Link, Navigate } from "react-router-dom"
import { remove, singlepost , like, unlike} from "./apiPost";
import { isAuthenticated } from "../auth/auth";
import Comment from "./comment";

import defaultPost0 from "../images/defaultPost0.png";
import defaultPost1 from "../images/defaultPost1.png";
import defaultPost2 from "../images/defaultPost2.png";
import defaultPost3 from "../images/defaultPost3.png";
import defaultPost4 from "../images/defaultPost4.png";
import "../user/user.css";
import Load from "../LoadingComponent";
class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: "",
            deleted: false,
            redirect: false,
            x: '0',
            like:false,
            likes:0,
            redirectToSignIn:false,
            comments:[]
            
        }
    }
   
  heartEmpty = () =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
         className="bi bi-heart" viewBox="0 0 16 16"
         onClick={this.likeToggle}>
<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
    );
}
 heartFull = () =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" 
        fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16"
        onClick={this.likeToggle}>
<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
    );
}
    componentDidMount() {
        const postId = this.props.location.pathname.split("/")[2];
        const x = this.props.location.search[1];
        this.setState({ x });
        singlepost(postId)
            .then((data) => {

                if (!data) {
                    this.setState({ redirect: true });

                }
                else if (data.error) {
                    console.log(data.error);


                }
                else {
                    
                    this.setState(
                        {
                            postId,
                            post: data,
                            likes:data.likes.length,
                            like:this.checkLike(data.likes),
                            comments:data.comments
                        }
                    );
                }
            })
            .catch((err) => {
                console.log(err);

            })

    }
    checkLike = (likes) =>{
            const userId = isAuthenticated() && isAuthenticated().user._id;
             const match = likes.indexOf(userId);
             if(match === -1){
                return false;
             }
             return true; 
        

    }
    removePost = () => {
        if (window.confirm("Are you sure to delete the post?")) {
            const token = isAuthenticated().token;
            const postId = this.state.postId;
            remove(postId, token)
                .then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        this.setState({
                            deleted: true
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    likeToggle = () =>{
        if(!isAuthenticated()){
            this.setState({redirectToSignIn:true});
            return 0;
        }
      let callApi =   this.state.like ? unlike : like ;
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      callApi(userId,token,this.state.postId)
      .then((data)=>{
              if(data.error){
                console.log(data.error);
              }
              else{
                this.setState({
                    like:!this.state.like,
                    likes:data.likes.length
                })
              }

      })
      .catch((err)=>{
       console.log(err);
      })

    }
    commentadding = (comments) =>{
      
        this.setState({comments:comments});
    }
    renderPost = (post) => {
        const { x, postId,likes } = this.state;

        const photoUrl = `${process.env.REACT_APP_API_URL}/preload/post/photo/${postId}`;
        const posterId = post.postedBy ? post.postedBy._id : "Unknown";
        const posterName = post.postedBy ? post.postedBy.name : "Unknown";
        let postx = defaultPost0;
        if (x === '1') {
            postx = defaultPost1;
        }
        else if (x === '2') {
            postx = defaultPost2;
        }
        else if (x === '3') {
            postx = defaultPost3;
        }
        else if (x === '4') {
            postx = defaultPost4;
        }
        return (
            <div className="flexbox-container" style={{ justifyContent: "center", display: "flex" }}>
                <div className="flexbox-item card  mb-2 mt-3 hx"
                    style={{ justifyContent: "center", alignItems: "center", width: "500px" }}
                >
                    <div className=" mt-3 " style={{
                        width: "400px",
                        height: "300px", padding: "auto", display: "flex", justifyContent: "center", alignItems: "center"
                        , borderRadius: "10px",

                    }}>
                        <img
                            src={photoUrl}
                            style={{ maxWidth: "350px", maxHeight: "300px",width:"auto",height:"auto" }}
                            className="card-img-top img-thumbnail"
                            onError={i => i.target.src = `${postx}`}
                            alt={post.name} />
                    </div>
                    <div>
                    <h5 style={{color:"black"}}>
              
                      {this.state.like?(this.heartFull()):(this.heartEmpty())}
                      {"   " + likes} Likes </h5> </div>
                    <div className="card-body" style={{ padding: "auto", display: "grid" }}>

                        <p className="card-text" style={{ fontWeight: "bolder",color:"black" }}>
                            {post.body}
                        </p>

                        <p className="fst-italic mark" style={{color:"black",textAlign:"center"}}>
                                Posted by <Link to={`/user/${posterId}?`}>{posterName }{" "}</Link>
                              on  {new Date(post.created).toDateString()}
                               </p>

                        {(isAuthenticated() && isAuthenticated().user._id === posterId) ?
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success "
                                    to={"/"}
                                    style={{ marginRight: "1rem" }}>
                                    Back To Home
                                </Link>
                                <Link className="btn btn-raised btn-warning "
                                    style={{ marginRight: "1rem" }}
                                    to={`/post/edit/${postId}`}>
                                    Update Post
                                </Link>
                                <button className="btn btn-raised btn-danger"
                                    onClick={() => { this.removePost() }}>
                                    Delete Post
                                </button> </div>
                            :
                            <Link className="btn btn-raised btn-success "
                                to={"/"}
                                style={{ marginRight: "1rem" }}>
                                Back To Home
                            </Link>

                        }



                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { post, deleted, redirect ,redirectToSignIn,comments} = this.state;
        if(redirectToSignIn){
            return (
                <Navigate to={"/signin"}></Navigate>
            )
        }
        if (redirect) {
            return (
                <Navigate to={"/"} />
            )
        }
        if (deleted) {
            return (
                <div className="jumbotron mt-5 " style={{ marginRight: "5rem", marginLeft: "5rem" }}>
                    <p className="alert alert-success">Deleted Post Successfully</p>
                    <Link to={"/"} className="btn btn-raised btn-success">Back to Home</Link>
                </div>

            )
        }
        return (<div>
            {post ?
                (<div style={{color:"white"}}>
                    <h1 className="text-center mt-3">{post.title}</h1>
                    {this.renderPost(post)}
                    <Comment postId={post._id} comments={comments} commentadding={(x)=>this.commentadding(x)} />
                   
                </div>)
                :
                (<div className="jumbotron">
                    <h2 className="text-center" style={{display:"flex",justifyContent:"center",marginTop:"150px"}}>
                        <Load/>
                    </h2>

                </div>)
            }
        </div>

        );



    }
};
const withLocation = Component => props => {
    const location = useLocation();
    return <Component {...props} location={location}></Component>
}
export default withLocation(SinglePost);