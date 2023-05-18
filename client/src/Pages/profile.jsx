import React, { useEffect } from 'react'
import "../style/profile.css"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut,Line,Pie } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Cookies from 'js-cookie';

ChartJS.register(ArcElement, Tooltip, Legend);


const token=Cookies.get('token');

const Profile = () => {
  const [Graph, settype] = React.useState(new Date().getMonth()+1);
  const [dbdata,setdata]=React.useState([])
  const [username,setusername]=React.useState('')
let credit=0,debit=0;
  useEffect(()=>{
    getUserData();

  },[])

 

  const getUserData=async()=>{
     const res=await fetch(`${process.env.REACT_APP_API_URL}/bills`,{
      method:"GET",
      headers :{
        Authorization:`Bearer ${token}`,
      }
     })

     const data=await res.json();

     setdata(data.data)
     setusername(data.name)
     
  }

const monthsdata= dbdata.filter(e=>e.date.slice(6,7)==Graph)
monthsdata.map((elem,i)=>{


    if( elem.transactionType===0){
      debit+=elem.amount
    }else{
      credit+=elem.amount
    }
  
  })

  const months=['January','Februaray','March','April',"May",'June','July','August','September','October','November','December']

  const data = {
    labels: ["Debit", 'Credit'],
    datasets: [
      {
        label: 'Rs',
        data: [debit, credit],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  
   
  };

  const handleChange = (event) => {
    settype(event.target.value);
  };
  return (
    <div className='container'>
     <main className='data-cards'>
          <div className="profile-cards">
            <div className="left">
              <span className="name">
                {username}
              </span>
              <span className="monthlyincome">
             {months[Graph-1]} Month's Cashflow:  {credit-debit}  {(credit-debit)<=0? <span style={{ padding:'1px', borderRadius:5,fontFamily:"nunito",background:'red',transition:'ease-in-out',transitionDelay:'1s',color:'white',fontSize:'12px'}}> Bad Expense</span>:'' }
              </span>
            </div>
            <div className="right">
              <div className="dpimg"></div>
            </div>
          </div>
          <div className="monthlyExpense">
          <div className="menuLeft">
            <Box sx={{ Width: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={Graph}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
        {
          months.map((elem,index)=>{
return (
  <MenuItem value={index+1}>{elem}</MenuItem>
)
          })
        }
          
          
        
        </Select>
      
      </FormControl>
    </Box>
    </div>
          <div className="graphRight"><Doughnut data={data}/></div>
          </div>
          
     </main>
    </div>
  )
}

export default Profile
