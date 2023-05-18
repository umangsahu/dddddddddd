import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ButtonAppBar() {
  const navigate=useNavigate();
  const logOut=()=>{
    Cookies.remove('token')
navigate('/login')

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} className='white-text'>
            Expense Tracker</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/profile"} className='white-text'>
            visit Profile!</Link>
          </Typography>
          {Cookies.get('token')&&<Button color="inherit" onClick={logOut}>LogOut</Button>}
          {Cookies.get('token')==undefined&&<><Link to={'/register'} className='white-text'>
          <Button color="inherit" >Register</Button></Link>
          <p>&nbsp;/&nbsp;</p>
          <Link to={'/login'} className='white-text'>
          <Button color="inherit" >Login</Button></Link></>}
          
          
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}