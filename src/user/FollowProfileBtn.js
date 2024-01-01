import React, { Component } from "react";
import {follow,unfollow} from "./apiUser";
class FollowProfileButton extends Component{
    
     followClick = ()=>{
        this.props.onButton(follow)
     }
     unfollowClick = () =>{
        this.props.onButton(unfollow);
     }
     render(){
        return (
           <div className="d-inline-block mt-2">
            {this.props.following?
                <button onClick={this.unfollowClick} className="btn btn-danger btn-raised ">
                UnFollow
                </button>:
               <button onClick={this.followClick} className="btn btn-success btn-raised " style={{marginRight:"5rem"}}>
                Follow
               </button>
           }
           </div>


        )
     }



};
export default FollowProfileButton;