import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom"
import {signout,isAuthenticated} from "../auth/auth";
import "./menucolor.css";
const isActive = (location,path) =>{
 
  if(location.pathname === path){return {color:"orange",borderColor:"white",
  fontFamily:"Georgia, 'Times New Roman', Times, serif",fontSize:"15px",fontWeight:"bolder"
}}
  else{ return {color:"white",fontFamily:"Georgia, 'Times New Roman', Times, serif",fontSize:"13px",fontWeight:"bolder"};}
}

const Menu = (props) =>{
  const {  location } = props;
      
      return (
        <div >
        <ul className="nav nav-tabs  gfg" >
            <li className="nav-item">
            <Link className="nav-link" 
            to="/" 
             style={isActive(location,"/")}
            >Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" 
                to="/users" 
                style={isActive(location,"/users")}
                >Users</Link>
                </li>
            {!isAuthenticated() &&(
              <>
                  <li className="nav-item">
            <Link className="nav-link" 
            to="/signup-firststep" 
            style={isActive(location,"/signup-firststep")}
            >Sign Up</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" 
            to="/signin"
           style={isActive(location,"/signin")}
            >Sign In</Link>
            </li>
              </>
            )}
           {isAuthenticated() && (
            <>
                
                 <li className="nav-item">
                 <Link className="nav-link" 
                  to="/findpeople"
                  style={isActive(location,"/findpeople")}
                 >Find People</Link>
                 </li>
                 <li className="nav-item">
                 <Link className="nav-link" 
                  to="/post/create/"
                  style={isActive(location,"/post/create/")}
                 >Create Post</Link>
                 </li>
                 <li className="nav-item">
                 <Link className="nav-link" 
                   onClick={()=>{
                    const url = this.props.location.pathname.split("/");
                    if(url.length === 3){
                     
                      if(url[1]==="/user"){window.location.reload();}
                      
                    }
                  
                   
                   }}
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(location,`/user/${isAuthenticated().user._id}`)}
                 
                 >{`${isAuthenticated().user.name} 's profile`}</Link>
                 </li>

                 <li className="nav-item">
                 <Link className="nav-link" 
                 
                 onClick={()=>{signout()}}
                  to="/"
                  style={isActive(location,"/signout")}
                 >Sign Out</Link>
                 </li>
                 

             </>
           )}
           
           
        </ul>
           
           
        </div>
      )
};
const withLocation = Component => props => {
  const location = useLocation();

  return <Component  {...props} location={location} />;
};
export default withLocation(Menu);

