import React,{Component} from "react";
import {useLocation,Navigate,Link} from "react-router-dom";
import {isAuthenticated} from "../auth/auth";
import {read} from "./apiUser";
import DefaultProfile from "../images/avatar.png"
import DeleteUser from "./deleteUser";
import "./user.css";
import FollowProfileButton from "./FollowProfileBtn";
import ProfileTabs from "./profileTabs";
import {listByUser} from "../post/apiPost";
import Load from "../LoadingComponent";
class Profile extends Component{
   constructor(props){
    super(props);
    this.state={
        user:{followers:[],following:[]},
        _id:"",
        redirectToSignIn : false,
        following:false,
        posts:[],
        loading:true
       
    }
    
   }
  checkFollower = (user) =>{
    const jwt = isAuthenticated();
    const match = user.followers.find((follower)=>{
      return (follower._id === jwt.user._id)
    });
    return match;
  }
  clickFollowBtn = (callApi) =>{
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
       callApi(userId,token,this.state.user._id)
       .then((result)=>{
          if(result.error){
            this.setState({error:result.error,});
          }
          else{
            this.setState({user:result,following:!this.state.following});
          }
       })
  }
  loadPosts = (userId)=>{
    const token = isAuthenticated().token;
    listByUser(userId,token).then((data)=>{
      if(data.error){
        console.log(data.error);
      }
      else{
        this.setState({posts:data});
      }
    })
    .catch((err)=>{
      console.log(err);
    })

  }
   init = (id) =>{
       const token = isAuthenticated().token;
      
      read(id,token)
      .then((data)=>{
        if(data.error){
           this.setState({
                redirectToSignIn:true,
                loading:false
           });
        }
        else{
           this.setState({loading:false});
            let following = this.checkFollower(data);
            
            this.setState({
                user:data,
                following,
                loading:false
             
            });
            this.loadPosts(data._id);
        }
      })
      .catch((err)=>{
        console.log(err);
    
      })
   
   }
   componentDidMount(){
   
      const id = this.props.location.pathname.split("/")[2];
    
      this.setState({_id:id});
     this.init(id);
    
    
   
   }
   
    render(){
        const {redirectToSignIn,user,_id,loading} = this.state;
        if(redirectToSignIn) return <Navigate to="/signin" />
        if(loading) {
         return <div className="jumbotron mt-5">
                    <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
                       <Load/>
                    </h3>

                </div>
        }  
     
        const photoUrl =  `${process.env.REACT_APP_API_URL}/preload/user/photo/${_id}`;
    return (
        <div className="container" style={{color:"white"}}>
            <h1 className="mt-5 ml-5">Profile</h1>

            <div className=" row justify-content-around" style={{marginTop:"4rem"}}>
         <div className=" ml-5" style={{width:"auto",marginRight:"4rem"}}>
            <img style={{maxHeight:"290px",maxWidth:"350px",height:"auto",width:"auto"}}
            className="img-thumbnail" 
            src={photoUrl} alt={user.name}
            onError={i=>i.target.src=`${DefaultProfile}`}
            ></img>
              </div>
              <div className=" ml-5 col-md-6 " style={{paddingLeft:"40px",paddingRight:"30px"}}>
              <div className="lead " style={{marginTop:"2rem",fontSize:"20px",fontWeight:"normal"}}>
                    <p>Name : {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>{`Joined on ${new Date(user.created).toDateString()}`}</p>
                    </div>
                {(isAuthenticated().user && (isAuthenticated().user._id === user._id))? 
                (
                    <div className="d-flex mt-5 justify-content-between">
                       <Link
                        className="btn btn-raised btn-info btn-lg"
                        to={`../post/create/`}
                     
                        style={{marginRight:"1rem"}}
                        >
                            Create Post
                        </Link>
                        <Link
                        className="btn btn-raised btn-success btn-lg"
                        to={`../user/edit/${user._id}`}
                     
                        style={{marginRight:"1rem"}}
                        >
                            Edit Profile
                        </Link>
                       <DeleteUser _id={user._id}/>

                    </div>

                ):<FollowProfileButton following={this.state.following} onButton={this.clickFollowBtn}/>
            
                }
                </div>
                
              <div className="row">
                <div className="col md-12 mt-5 " style={{fontSize:"20px",fontWeight:"normal"}}>
                 <hr/>
                    <p className="lead" style={{marginLeft:"6rem",fontWeight:"normal"}}>
                    About : {user.about?user.about:"Available"}
                    </p>
                   <hr/>
                </div>

              </div>
              
                <ProfileTabs followers={user.followers} following={user.following} posts={this.state.posts}/>
               
                </div>
                </div>
    )}
      
      
              }
   
    


const withLocation = Component => props => {
    const location = useLocation();
  
    return <Component  {...props} location={location} />;
  };
export default withLocation(Profile);