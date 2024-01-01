import React, { Component } from "react";
import { list } from "../user/apiUser";
import DefaultProfile from "../images/avatar.png"
import { Link } from "react-router-dom";
import "./user.css"
import Load from "../LoadingComponent";
class User extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading:false
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        list()
            .then((data) => {
             
                if (data.error) {
                    console.log(data.error);
                    this.setState({loading:false});
                    
                }
                else {
                    this.setState({
                        users: data,
                        loading:false
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading:false});
            })

    }
    renderUsers = (users) => {

        return (
            <div className="flexbox-container row  mt-5 "  style={{display:"flex",justifyContent:"flex-start",marginLeft:"5rem"}} >
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
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">
                                    {user.email}
                                </p>
                                <Link
                                    to={`/user/${user._id}`}
                                    className="btn btn-raised btn-secondary"
                                >View Profile</Link>

                            </div>
                        </div>

                    )
                }
                )
                    : <></>}
            </div>
        );
    }
    render() {
        const users = this.state.users;


        let ux = users.users;
          if(this.state.loading){
            return (
                <div className="jumbotron mt-5">
                    <h3 className="text-center" style={{display:"flex",justifyContent:"center"}}>
                       <Load/>
                    </h3>

                </div>
            )
          }


        return (
            <div className="flexbox-container" style={{margin:"auto"}}>
               
                    <div className="flexbox-container mt-5 mb-5" >
                    <h1 style={{marginLeft:"5rem",color:"white"}}>Users</h1>
                    </div>
                    {this.renderUsers(ux)}
               

            </div>
        )




    }





};
export default User;