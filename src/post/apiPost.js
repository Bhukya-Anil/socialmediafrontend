export const create = (id, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/preload/post/new/${id}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: post
  })
    .then((response) => {
      return response.json();
    })

}
export const list = () => {
  
  return fetch(`${process.env.REACT_APP_API_URL}/preload/`, {
    method: "GET"

  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    })
}

export const singlepost = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/preload/post/${postId}`, {
    method: "GET"

  })
    .then((response) => {
     // console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    })
}
export const listByUser = (userId,token) =>{
 
  return  fetch(`${process.env.REACT_APP_API_URL}/preload/posts/by/${userId}`,{
       method:"GET" ,
       headers: {
        Accept: "Application/json",
        "Content-Type":"Application/json",
        Authorization: `Bearer ${token}`
      },
       
     })
     .then((response)=>{
      console.log(response);
       return response.json();
     })
     .catch((err)=>{
     console.log(err);
    })
  }
  export const remove = (postId,token) =>{
    return  fetch(`${process.env.REACT_APP_API_URL}/preload/post/${postId}`,{
      method:"DELETE",
      headers:{
          Accept:"Application/json",
          "Content-Type":"Application/json",
          Authorization:`Bearer ${token}`
      }
    })
    .then((response)=>{
      return response.json();
    })
    .catch((err)=>{
    console.log(err);
    })
  
  
  
  }
  export const updatePost = (postId,token,post) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/preload/post/${postId}`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
      }
      ,
      body:post
    })
    .then((resp)=>{
      return resp.json();
    })


  }
  export const like = (userId,token,postId) =>{
 
    return fetch(`${process.env.REACT_APP_API_URL}/preload/post/like`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }
      ,
      body:JSON.stringify({userId,postId})
    })
    .then((resp)=>{
      return resp.json();
    })



  }
  export const unlike = (userId,token,postId) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/preload/post/unlike`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }
      ,
      body:JSON.stringify({userId,postId})
    })
    .then((resp)=>{
      return resp.json();
    })


  }
  export const addcomment = (userId,token,postId,comment) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/preload/post/comment`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }
      ,
      body:JSON.stringify({comment,postId,userId})
    })
    .then((resp)=>{
      return resp.json();
    })


  }
  export const uncomment = (userId,token,postId,comment) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/preload/post/uncomment`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }
      ,
      body:JSON.stringify({comment,postId,userId})
    })
    .then((resp)=>{
      return resp.json();
    })


  }

