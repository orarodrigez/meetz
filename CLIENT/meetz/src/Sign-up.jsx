import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState , useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'




export default function SignUp(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate = useNavigate()
  const OldUser = () => navigate('/SignIn')

  const oldUser1 = (e) => {
    console.log('event')
    props.callback('0') 
  };
  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>500?windowWidth.current*2:windowWidth.current

  return (
  <div className='hh' style={{maxWidth:widthP*0.6,marginRight:widthP*0.2,marginLeft:widthP*0.2}}>
       
          <Avatar sx={{ m: 1,bgcolor: 'secondary.main' }} style={{margin:'auto'}}>

            <LockOutlinedIcon />
          </Avatar>
          <h2>צור חשבון חדש </h2>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{
        '& > :not(style)': {m: 1},
      }} >
         
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  margin="normal"
                  id="firstName"
                  label="שם פרטי"
                  autoFocus
                /><br/>
              
                <TextField
                  required
                  margin="normal"
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                /><br/>
              
                <TextField
                  required
                  margin="normal"
                  id="email"
                  label="כתובת דואל"
                  name="email"
                  autoComplete="email"
                /><br/>
             
                <TextField
                  required
                  margin="normal"
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                /><br/>
             
                <TextField
                  required
                  name="cell"
                  label="נייד"
                  id="cell"
                  autoComplete="cell"
                  margin="normal"
                  
                /><br/>
             
                <TextField
               multiline
               
               rows={2}
                 margin="normal"
                  required
                  name="address"
                  label="כתובת למשלוח"
                  id="address"
                  autoComplete="address"
                /><br/>
              <br/>
                <FormControlLabel
                 
                  control={<Checkbox value="allowExtraEmails"  color="primary" />}
                  label="אשמח לקבל עדכונים שוטפים  
                  על מבצעים הנחות ומוצרים חדשים"
                /><br/>
                  <Button
                  fullWidth
               variant="contained"
              sx={{  mt: 3, mb: 2 }}
            >
              צור חשבון
            </Button>
           
          </Box>
          <br/>
                <Link href="#"  onClick={OldUser}>
                  קיים כבר חשבון? התחבר
                </Link>
           
        </div>
  );
}