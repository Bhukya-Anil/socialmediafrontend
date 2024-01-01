import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import "../user/user.css";
import defaultPost0 from "../images/defaultPost0.png";
import defaultPost1 from "../images/defaultPost1.png";
import defaultPost2 from "../images/defaultPost2.png";
import defaultPost3 from "../images/defaultPost3.png";
import defaultPost4 from "../images/defaultPost4.png";
import Load from "../LoadingComponent";
class Post extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        list()
            .then((data) => {

                if (data.error) {
                    console.log(data.error);
                    this.setState({ loading: false });

                }
                else {
                    this.setState({
                        posts: data,
                        loading: false
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            })

    }
    renderPosts = (posts) => {

        return (
            <div className="flexbox-container row  mt-5 " style={{ display: "flex", justifyContent: "flex-start", marginLeft: "5rem" }} >
                {posts ? posts.map((post, i) => {
                    const posterId = post.postedBy? post.postedBy._id :"../";
                    const posterName = post.postedBy? post.postedBy.name :" Unknown ";
                    const photoUrl = `${process.env.REACT_APP_API_URL}/preload/post/photo/${post._id}`;
                    let x = Math.round((Math.random())*5);
                    
                    let postx=defaultPost0;
                    if(x===1){
                     postx=defaultPost1;
                    }
                    else if(x===2){
                        postx=defaultPost2;
                    }
                    else if(x===3){
                        postx = defaultPost3;
                    }
                    else if(x===4){
                        postx = defaultPost4;
                    }

                    return (
                        <div className="flexbox-item card col-md-4 mb-2 mt-3 hx"
                            style={{ alignItems: "center", width: "350px", marginRight: "3rem", marginLeft: "3rem" }}
                            key={i}>
                            <div className=" mt-3 hxx" style={{
                                width: "300px",
                                height: "300px", padding: "auto", display: "flex", justifyContent: "center", alignItems: "center"
                                , borderRadius: "10px"

                            }}>
                                <img
                                    src={photoUrl}
                                    style={{ maxWidth: "290px",  maxHeight: "290px",width:"auto",height:"auto"}}
                                    className="card-img-top "
                                    onError={i => i.target.src = `${postx}`}
                                    alt={post.name} />
                            </div>
                            <div className="card-body" style={{ paddingLeft: "1vh" ,display:"grid"}}>
                                <h4 className="card-title">{post.title}</h4>
                                <p className="card-text fst-italic mt-1" style={{fontWeight:"bolder"}}>
                                    {post.body.substring(0,30)}...........
                                </p>
                               
                               <p className="fst-italic mark">
                                Posted by <Link to={`user/${posterId}?`}>{posterName }{" "}</Link>
                              on  {new Date(post.created).toDateString()}
                               </p>
                                <Link
                                    to={`/post/${post._id}?${x}`}
                                    className="btn btn-raised btn-secondary"
                                >View Post</Link>

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
        const posts = this.state.posts;

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
            <div className="flexbox-container" style={{ margin: "auto" }}>

                <div className="flexbox-container mt-5 mb-5" >
                    <h2 style={{ marginLeft: "5rem",color:"white" }}>  Posts</h2>
                </div>
                {this.renderPosts(posts)}


            </div>
        )




    }





};
export default Post;