export const signout = (next) =>{
    if(typeof(window)){
      localStorage.removeItem("jwt");
  
    }
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/preload/signout`,{
      method:"GET"
    })
    .then((res)=>{
      console.log(res);
      return res.json();
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  export const isAuthenticated = () =>{
       if(typeof(window)){
        if(localStorage.getItem("jwt")){
          return JSON.parse(localStorage.getItem("jwt"));
        }
        
       }
       return false;
    
  
  };
  export const signup = (user) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/preload/signup`,{
       method:"POST",
       headers:{
         Accept:"application/json",
         "Content-Type" :"application/json"

       },
       body: JSON.stringify(user)
     }).then((res)=>{
           return res.json();
     })
     .catch((err)=>{
       console.log(err);

     })
      

       

   }
export const forgotPassword = (email) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/preload/forgot-password`,{
       method:"PUT",
       headers:{
        Accept:"Application/json",
        "Content-Type":"Application/json",
       },
       body:JSON.stringify({email})

    })
    .then((resp)=>{
      return resp.json();
    })
}
export  const resetPassword = (resetPasswordLink,newPassword) =>{
    
  return fetch(`${process.env.REACT_APP_API_URL}/preload/reset-password`,{
    method:"PUT",
    headers:{
      Accept:"Application/json",
      "Content-Type":"Application/json"
    },
    body:JSON.stringify({resetPasswordLink,newPassword})
  })
  .then((resp)=>{
    return resp.json();
  })

}

export const signupfirststep = (user) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/preload/signup-firststep`,{
     method:"POST",
     headers:{
       Accept:"application/json",
       "Content-Type" :"application/json"

     },
     body: JSON.stringify(user)
   }).then((res)=>{
         return res.json();
   })
   .catch((err)=>{
     console.log(err);

   })
  }
    
   export const signupcompletionstep = (user) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/preload/signup-completionstep`,{
       method:"POST",
       headers:{
         Accept:"application/json",
         "Content-Type" :"application/json"
  
       },
       body: JSON.stringify(user)
     }).then((res)=>{
           return res.json();
     })
     .catch((err)=>{
       console.log(err);
  
     })
      
     

 }
