import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


export default function BasicTable(props) {

  
  const Editdata=(e)=>{
    props.setData(e);
  }

    const remove=async(e)=>{

        if(!window.confirm('Are you sure')) return

        const res= await fetch(`${process.env.REACT_APP_API_URL}/transaction/${e}`,{
            method:"DELETE"
        });

        if(res.ok){
         
            window.alert("succesfully Deleted!" )
            props.ft()//for fetch the transcation
        }

    }
  return (
    <>
    <Typography varient='h6' sx={{marginTop:10}}>Transaction List</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Credit/Debit</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody sx={{padding:10}}>
          {props.rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"align="center">
              {row.amount}
              </TableCell>
             
              <TableCell align="center">{row.description}</TableCell>
            
              <TableCell align="center">{row.transactionType===1?'Credit':"Debit"}</TableCell>
              < TableCell align="center">{row.date.slice(0,10)}</TableCell>
              <TableCell align="center">
          
             <IconButton color='primary' component='label'  onClick={()=>Editdata({Amount:row.amount,Description:row.description,transactionType:row.transactionType,Date:row.date.slice(0,10),Id:row._id})}>
             < EditTwoToneIcon />
             </IconButton>
             
             <IconButton color='warning' component='label' onClick={()=>remove(row._id)}>
              <DeleteTwoToneIcon />
             </IconButton>
            
              </TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}