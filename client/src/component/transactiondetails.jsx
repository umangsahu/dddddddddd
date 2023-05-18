import *as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);




const calenderStyle={
  fontFamily:` "Roboto","Helvetica","Arial",sans-serif`,
  fontWeight: 400,
  fontSize:`1rem`,
  lineHeight:`1.4375em`,
  letterSpacing:` 0.00938em`,
  color: `rgba(0, 0, 0, 0.87)`,
  boxSizing: `border-box`,
  position: `relative`,
  cursor: `text`,
  display:` inline-flex`,
  alignItems: `center`,
  position: `relative`,
  borderRadius: `4px`,
  width: `15rem`,
height: `41px`,

margin:` 0 9px`,
marginTop:`5px`,
border: `1px solid #807979`,
}
const token = Cookies.get('token')


export default function BasicCard({editTransaction}) {
//create purpose
  const [form,setform]= useState({
    Amount:0,
    Description:'',
    TransactionType:'',
    date:new Date()
   })

   //update purpose
   console.log(editTransaction)
   const editValue={
    Amount:editTransaction.Amount,
   Description:editTransaction.Description,
   TransactionType:editTransaction.transactionType,
   date:editTransaction.Date
   
}
   useEffect(()=>{
    if(editTransaction.Amount!==undefined){

      setform(editValue)
    }
    
   },[editTransaction])

   const   handleInput=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
   
         }
   const  handleform=async (e)=>{
            e.preventDefault();

            const res=editTransaction.Amount===undefined?create():update();
           
         
            const data=await res.json;
        
    
        }
        const create= async()=>{
          const response= await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
            method:"POST",
            body:JSON.stringify(form),
            headers:{
              Authorization:`Bearer ${token}`,
                'content-type':'application/json'
            }

        })
       
        return response;
        }

        const update= async()=>{
          const response= await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction.Id}`,{
            method:"PATCH",
            body:JSON.stringify(form),
            headers:{
                'content-type':'application/json'
            }

        })
      
        return response;
        }
       
    

  return (
    <Card sx={{ width:800 ,margin:`auto`,marginTop:10 }}>
      <CardContent>
        <Typography variant="h5">
         Add New Transaction
        </Typography>
        <form  onSubmit={handleform}>
      <TextField size='small' name='Amount' sx={{margin:'5px'}} type='number' onChange={(e) => handleInput(e)}  value={form.Amount} id="outlined-basic" label="Add Amount" variant="outlined"/>
      <TextField size='small' name="Description"sx={{margin:'5px'}} type='text'  onChange={(e) => handleInput(e)}  value={form.Description} id="outlined-basic" label="Description" variant="outlined"/>  
    
      <input type="date" name="date" id="" style={calenderStyle} onChange={handleInput}  value={form.date} placeholder='dd/mm/yyyy'/>
      <InputLabel id="demo-simple-select-label">Credit/Debit</InputLabel>
        <Select 
        sx={{marginRight:5}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ form.TransactionType
          }
          label=""
          name="TransactionType"
          onChange={(e) => handleInput(e)}
        >
          <MenuItem value={1}>Credit</MenuItem>
          <MenuItem value={0}>Debit</MenuItem>
       
        </Select>
  {
    editTransaction.Amount!==undefined&&(<Button type="submit" variant="Danger">Update</Button>)
   }
    {
    editTransaction.Amount===undefined&&(<Button type="submit" variant="contained">Submit</Button>)
   }
    
    </form>
       
      </CardContent>
      
    </Card>
  );
}