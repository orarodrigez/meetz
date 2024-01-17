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



export default function Bar(data) {
  const navigate = useNavigate()

  
  const oldUser = () => navigate('./SignIn')
  return (
    <>
      <AppBar  style={{ 
         background: '#ffff'}} >
            <Toolbar>
              <IconButton onClick={oldUser}  >
              <AccountCircle fontSize='large' />
            </IconButton>
            <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} >  <img  height="100ch" width="100ch"  src={logoImg} ></img>   
          </Box>
  
   
             
        
          {/*  <Box display='flex' flexGrow={1}>   <h1 >רישוי עסקים</h1>  </Box>
     
       <img  height="50ch" width="150ch" src={logoImg} ></img>*/ }
        
      
        </Toolbar>
      
      </AppBar>
      
</>
  );
}