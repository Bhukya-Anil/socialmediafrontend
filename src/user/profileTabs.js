import React,{Component} from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
import defaultPost0 from "../images/defaultPost0.png";
class ProfileTabs extends Component{
    render(){
        const {followers,following,posts} = this.props;
        
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3 className="fx">Followers</h3>
                    <hr/>
                    {followers.map((person,i)=>{
                    return <div key={i} style={{marginBottom:"1rem"}}>
                        <div className="row">
                            <Link to={`/user/${person._id}`} style={{display:"flex"}} onClick={this.forceUpdate}>
                                <img
                                className="float-left "
                                height={"40px"} 
                                width={"40px"}
                                
                                style={{marginRight:"10px",borderRadius:"50%",
                                marginBottom:"1rem",border:"2px solid black"}}
                                src={`${process.env.REACT_APP_API_URL}/preload/user/photo/${person._id}`}
                                alt={person.name}
                                onError={i=>i.target.src=`${DefaultProfile}`}

                                ></img>
                                <div >
                                    <h5 className="fx">{person.name}</h5>
                                </div>
                            </Link>
                            <hr/>
                           
                        </div>
                       
                     </div>
                    })}
                </div>
                <div className="col-md-4">
                <h3 className="fx">Following</h3>
                    <hr/>
                    {following.map((person,i)=>{
                    return <div key={i}>
                        <div className="row" style={{marginBottom:"1rem"}}>
                            <Link to={`/user/${person._id}`} style={{display:"flex"}}
                            onClick={this.forceUpdate}
                            >
                                <img
                                className="float-left "
                                height={"40px"} 
                                width={"40px"}
                                
                                style={{marginRight:"10px",borderRadius:"50%",
                                marginBottom:"1rem",border:"2px solid black"}}
                                src={`${process.env.REACT_APP_API_URL}/preload/user/photo/${person._id}`}
                                alt={person.name}
                                onError={i=>i.target.src=`${DefaultProfile}`}

                                ></img>
                                <div >
                                    <h5 className="fx">{person.name}</h5>
                                </div>
                            </Link>
                            <hr/>
                          
                        </div>
                       
                     </div>
                    })}

                </div>
                <div className="col-md-4">
                    <h3 className="fx">Posts</h3>
                    <hr/> 
                    {posts.map((post,i)=>{
                    return <div key={i}>
                        <div className="row" style={{marginBottom:"1rem"}}>
                            <Link to={`/post/${post._id}?0`} style={{display:"flex"}}
                           
                            >
                                <img
                                className="float-left "
                                height={"40px"} 
                                width={"40px"}
                                
                                style={{marginRight:"10px",borderRadius:"50%",
                                marginBottom:"1rem",border:"2px solid black"}}
                                src={`${process.env.REACT_APP_API_URL}/preload/post/photo/${post._id}`}
                                alt={post.title}
                                onError={i=>i.target.src=`${defaultPost0}`}

                                ></img>
                                <div >
                                    <h5 className="fx">{post.title}</h5>
                                </div>
                            </Link>
                            <hr/>
                          
                        </div>
                       
                     </div>
                    })}
                </div>
              
            </div>

        )
    }



}
export default ProfileTabs;