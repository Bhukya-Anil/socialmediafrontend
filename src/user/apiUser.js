export const read = (id,token) =>{
    return  fetch(`${process.env.REACT_APP_API_URL}/preload/user/${id}`,{
         method:"GET",
         headers:{
             Accept:"Application/json",
             Authorization:`Bearer ${token}`
         }
       })
       .then((response)=>{
         return response.json();
       })
       .catch((err)=>{console.log(err)})
    }
    export const list = () =>{
        return  fetch(`${process.env.REACT_APP_API_URL}/preload/users/`,{
             method:"GET",
             headers:{
                 Accept:"Application/json"
                 
             }
           })
           .then((response)=>{
             return response.json();
           })
           .catch((err)=>{
           console.log(err);
          })
        }
export const remove = (id,token) =>{
  return  fetch(`${process.env.REACT_APP_API_URL}/preload/user/${id}`,{
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
export const update = (id,token,user) =>{
   return fetch(`${process.env.REACT_APP_API_URL}/preload/user/${id}`,{
          method:"PUT",
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
          },
          body:user

   })
   .then((data)=>{
          console.log(data);
       return data.json();
   });

   

}
export const follow = (userId,token,followId)=>{

  return fetch(`${process.env.REACT_APP_API_URL}/preload/user/follow`,
       {method:"PUT",
       headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
       },
       body:JSON.stringify({
        userId,
        followId
       })
      }

       )
       .then((resp)=>{
       
        return resp.json();
       })
       .catch((err)=>{
       console.log(err);
      })
}

export const unfollow = (userId,token,followId)=>{
        return fetch(`${process.env.REACT_APP_API_URL}/preload/user/unfollow`,
             {method:"PUT",
             headers:{
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
             },
             body:JSON.stringify({
              userId,
              followId
             })
            }
      
             )
             .then((resp)=>{
              return resp.json();
             })
             .catch((err)=>{
             console.log(err);
            })
            
      
      }
export const findPeople = (userId,token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/preload/user/people/${userId}`,
  { method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    

  })
  .then((res)=>{
    return res.json();
  })
  .catch((err)=>{
    console.log(err);
  })

}