import * as React from 'react';
import { useState , useEffect,useRef} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import logoImg from './images/logo13.jpg';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';


import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SignInSide from './Sign-in';
import { Popper } from '@mui/base/Popper';
import SignUp from './sign-up';

export default function Bar(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState(false);
  const [oldUser, setoldUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const handleClick = (event) => {
    setoldUser(event.currentTarget);
  };

  const handleClose = () => {
    setoldUser(null);
  };

  const open = Boolean(oldUser);
  const id = open ? 'simple-popover' : undefined;

  
  
  const Sign = () => 
  {
  
    setoldUser(null);
    props.callback(1);
    
  }
 
  
  return (
    <>
      <AppBar  style={{ 
         background: '#ffff'}} >
            <Toolbar>
              
            <Box display={'flex'}  flexGrow={1} >   <IconButton onClick={handleClick}  >
              <AccountCircle fontSize='large' />
            </IconButton>
            <IconButton   >
              <ShoppingBagOutlinedIcon fontSize='large' />
            </IconButton>
          </Box> <img  height="120ch" width="120ch"  src={logoImg} ></img> 
          <Popover
        id={id}
        open={open}
        anchorEl={oldUser}
        onClose={handleClose}
        style={{marginTop:'2%'}}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
       
   <SignInSide callback={Sign}/>
   </Popover> 
   {newUser&&<SignUp/>}
  
          {/*  <Box display='flex' flexGrow={1}>   <h1 >רישוי עסקים</h1>  </Box>
     
       <img  height="50ch" width="150ch" src={logoImg} ></img>*/ }
        
      
        </Toolbar>
      
      </AppBar>
      
</>
  );
}