import * as React from 'react';
import { useState,useEffect,useRef } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"
import axios from 'axios'




export default function NewPass(props) {
    const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);
  const [notExist, setNotExist] = useState(false);
  const [pwdNew, setPwdTemp] = useState(false);
  const [pwd, setPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');
  const [newPwdMessage, setNewPwdMessage] = useState('');
   async function sendEmail  () {
    if (!send)
    {
    var user = await  axios.post(url+'/checkUserEmail/',{email:email}) 
    console.log(user)
    if (user.data!=null) 
     {
        setNotExist(false)
       user = await  axios.post(url+'/sendNewPwd/',{email:email}) 
       if (user!=null)
          setSend(true);
        
        
    }
    else
      setNotExist(true)
    }
    else
     {
      savePwd();
     }
    };
    async function savePwd  () {
      var user = await  axios.post(url+'/checkUser/',{email:email,password:pwd}) 
      console.log(user)
      if (user.data!=null) 
       {
         user = await  axios.post(url+'/NewPassword/',{email:email,password:newPwd}) 
         if (user!=null)
           setPwdNew(true);
       }
      else
        setNotExist(true)
  
       
      };


  return (
    
         <div className='hh' style={{maxWidth:widthP*0.6,marginRight:widthP*0.2,marginLeft:widthP*0.2}}> 
          
          <Avatar sx={{ m: 1,bgcolor: 'secondary.main' }} style={{margin:'auto'}}>

          <LockOutlinedIcon />
          </Avatar>
            < h2>שכחתי סיסמא</h2>
      
              <TextField
                margin="normal"
                required
                id="email"
                label="דוא'ל"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>setEmail(e.target.value)}
                helperText={emailMessage}
                error={emailMessage!=''}
              />
              <br/>
              {send&&<> <TextField
               style ={{width:'80%',fontSize:'20px'}}
                margin="normal"
                required
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPwd(e.target.value)}
                helperText={pwdMessage}
                error={pwdMessage!=''}
              /> 
              <TextField
              style ={{width:'80%',fontSize:'20px'}}
               margin="normal"
               required
               name="new_password"
               label=" סיסמא חדשה"
               type="password"
               id="new_password"
               autoComplete="current-new_password"
               onChange={(e)=>setNewPwd(e.target.value)}
               helperText={newPwdMessage}
               error={NewpwdMessage!=''}
             /></>}<br/>
              <Button
                sx={{  mt: 3, mb: 2 }}
                onClick={sendEmail}
                variant="contained"
               
                size='large'
                style={{fontSize:'20px'}}
                
              >
              
                {!send?שלח:שמור}
              </Button>  
              {send&&!pwdNew&&<p>סיסמא חדשה נשלחה לכתובת דואל:{email}</p> }
              {!send&&notExist&&<p>כתובת דואר אלקטרוני לא קיימת במאגר הלקוחות</p> }
              {send&&notExist&&<p>סיסמא זמנית שגויה</p> }
              {pwdNew&&<p> סיסמא שונתה בהצלחה</p> }
             
               
              
 
          
          </div>
   
  );
}