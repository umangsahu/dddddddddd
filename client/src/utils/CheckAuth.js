// import  {useState, useEffect } from 'react'
// import Cookies from 'js-cookie';
// import { redirect } from 'react-router-dom';
// const token= Cookies.get('token');


// const CheckAuth = ({children}) => {

// const[isloading,setloading]=useState(true)

//   async function validateToken(){
   
//     const res=await fetch(`${process.env.REACT_APP_API_URL}/user`,{
//     headers:{
//      Authorization:`Bearer ${token}`
//     }
//    })

//    setloading(false)
//    console.log(res.ok)
//    if(!res.ok) {redirect("/login")}
//    }

  
//    useEffect(()=>{
//     validateToken();
    
//     },[])

//   if(isloading){
//     return <p>Loading...</p>
//   }
//   return children
 
// }

// export default CheckAuth
import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom';

const Guest = ({children}) => {
    const token=Cookies.get('token');

  return token?children:<Navigate to="/login" replace={true}/>
}

export default Guest
