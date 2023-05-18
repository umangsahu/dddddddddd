import React, { useEffect } from 'react'
import { useState } from 'react';
import BasicTable from './Transaction';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';

const ShowData = ({set}) => {
    const [transactions,setTransaction]=useState([]);

    useEffect(()=>{
      fetchtransaction();
        
    },[]);
    
    const fetchtransaction=async ()=>{
      const token = Cookies.get('token')
    const res= await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      headers:{
Authorization:`Bearer ${token}`
      }
    });
    const data=await res.json();
    setTransaction(data.data);
 
    }
    
  return (
    <Container  maxWidth="la">
    <BasicTable rows={transactions} setData={set} ft={()=>fetchtransaction} />
    </Container>
  )
}

export default ShowData
