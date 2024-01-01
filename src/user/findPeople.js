import React, { Component } from "react";
import { findPeople } from "../user/apiUser";
import DefaultProfile from "../images/avatar.png"
import { Link } from "react-router-dom";
import "./user.css"
import {isAuthenticated} from "../auth/auth";
import {follow} from "../user/apiUser";
import Load from "../LoadingComponent";
class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading:false,
            search:"",
            error:"",
            searchedUsers:[]
        }
    }

    componentDidMount() {
        this.setState({loading:true});
          const id = isAuthenticated().user._id;
          const token = isAuthenticated().token;
        findPeople(id,token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({loading:false});
                }
                else {
                    this.setState({
                        users: data,
                        searchedUsers:data,
                        loading:false
                    });
                }
            })
            .catch((err) => {
                this.setState({loading:false});
                console.log(err);
            })

    }
    clickFollow = (userId,token,user,i) =>{
     
        follow(userId,token,user._id)
        .then((data)=>{ 
           if(data.error){
            this.setState({error:data.error});
           }
           let toFollow = this.state.users;
          toFollow.splice(i,1);
          
           this.setState({users:toFollow,
            open:true,
            followMessage:`Following ${user.name}`
        
        });

        })
        .catch((err)=>{
            console.log(err);
            this.setState({error:err});
        })
    }
    isMatch = (a,b) =>{
       let x = a.length;
       let y = b.length;
       let cnt=0;
       let i=0;
       let j=0;
       while(i<x && j<y){
        if(a[i]==b[j]){i++;j++;cnt++;}
        else {j++;}
       }
       if(10*cnt<7*x){return 1;}
       return 0;
    }
    findSearch = (a) =>{
        if(a.length){
           this.setState({searchedUsers:this.users});
        }
        else {
            let search = [];
           for(let i=0;i<this.users.length;i++){
            if(this.isMatch(a,this.users[i])){
               search.push(this.users[i]);
            }
           }
           this.setState({searchedUsers:search});
        }
    }
    renderUsers = (users) => {
        const id = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        if(users===null || users===undefined || (users.length)===0){
            return (
                <div className="flexbox-container row  mt-5 "  style={{display:"flex",justifyContent:"flex-start",marginLeft:"5rem"}} >
                    
                        <h6>
                        <u>Hurrah! You follow everyone</u></h6>
                </div>
            );
        }
        return (
            <div className="flexbox-container row  mt-5 "  style={{display:"flex",justifyContent:"flex-start",marginLeft:"5rem"}} >
                <input onChange={(e)=>{this.findSearch(e.target.value)}} type="text"></input>
                {users ? users.map((user, i) => {
                    const photoUrl = `${process.env.REACT_APP_API_URL}/preload/user/photo/${user._id}`;
                   
                    return (
                        <div className="flexbox-item card col-md-4 mb-2 mt-3 hx"
                        style={{alignItems:"center",width:"350px",marginRight:"3rem",marginLeft:"3rem"}}
                        key={i}>
                            <div className=" mt-3 hxx" style={{width:"300px",
                            height:"300px",padding:"auto",display:"flex",justifyContent:"center",alignItems:"center"
                            ,borderRadius:"10px"
                            
                            }}>
                                <img
                                    src={photoUrl}
                                    style={{ maxWidth: "290px",  maxHeight: "290px", width:"auto",height:"auto"}}
                                    className="card-img-top "
                                    onError={i => i.target.src = `${DefaultProfile}`}
                                    alt={user.name} />
                            </div>
                            <div className="card-body" style={{ paddingLeft: "1vh" }}>
                                <h5 className="card-title" style={{color:"black"}}>{user.name}</h5>
                                <Link
                                    to={`/user/${user._id}`}
                                    className="btn btn-raised btn-secondary"
                                >View Profile</Link>
                                 <button
                                    onClick={()=>{this.clickFollow(id,token,user,i)}}
                                    className="btn btn-raised btn-success"
                                    style={{marginLeft:"1rem"}}
                                >Follow</button>

                            </div>
                        </div>

                    )
                }
                )
                    : <></>
                }
            </div>
        );
    }
    render() {
        const users = this.state.users;
            const loading = this.state.loading;
            if(loading){
                return (
                    <div className="jumbotron">
                    <h2 className="text-center" style={{display:"flex",justifyContent:"center",marginTop:"150px"}}>
                        <Load/>
                    </h2>

                </div>
                )
            }
        return (
            <div className="flexbox-container" style={{margin:"auto",color:"white"}}>
               
                    <div className="flexbox-container mt-5 mb-5" >
                    <h1 style={{marginLeft:"5rem"}}>Find People</h1>
                    <div style={{marginLeft:"5rem",marginRight:"5rem"}}>
                       {this.state.open? <p className="alert alert-success">
                        {this.state.followMessage}
                        </p>:<></>}
                    </div>
                    </div>
                    {this.renderUsers(this.searchedUsers)}
               

            </div>
        )




    }





};
export default FindPeople;