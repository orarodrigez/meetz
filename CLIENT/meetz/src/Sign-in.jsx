import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { FormHelperText } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useCookies } from 'react-cookie';
import { useState , useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import RtlProvider from './RtlProvider';
import axios from 'axios'






export default function SignInSide(props) {
  const url=import.meta.env.VITE_URL_BASE
  const [userExist, setUserExist] = useState(true)
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const handle = () => {
    setCookie('email', email, { path: '/' });
    setCookie('Password', pwd, { path: '/' });
 };
 const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pass= /^(?=.*\d)(?=.*\D)(?=.*[a-z]).{5,10}$/; 

 const navigate = useNavigate()

  async function handleSubmit () {
if (!check())
 return;
    const user = await  axios.post(url+'/checkUser/',{email:email, password:pwd}) 
    if (user.data!=null) 
    
        sessionStorage.setItem("User",JSON.stringify({'firstName': user.firstName, 'lastName':user.lastName,  'cell_no':user.cell_no, 'email':user.email, 
        'city':user.city,    'street':user.street,    'house_no':user.house_no,    'enter_no':user.enter_no,    'building':user.building,    'zip_id':user.zip_id,    'pob':user.pob}))
    else
      setUserExist(false)
   console.log(user.data);
  };
  const NewUser = () => {
    props.callback(1);

  }
  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>1100?windowWidth.current/4:windowWidth.current
  function check()
  {
    setEmailMessage('')
   
    setPwdMessage('')
   
   
    var valid=true
    
  if (!emailreg.test(email))
  { 
    setEmailMessage('יש למלא דוא"ל תקין')
    valid=false;
  }
  if (!pass.test(pwd)) 
  {
        setPwdMessage('יש למלא סיסמא תקינה')
        valid=false;
      }
      return valid;
      }

  return (
    <RtlProvider>
         <div className='user' style={{width:widthP*0.6}}> 
          
          <Avatar sx={{ m: 1,bgcolor: 'secondary.main' }} style={{margin:'auto'}}>

          <LockOutlinedIcon />
          </Avatar>
            < h2>התחבר</h2>
              

              
           
              <TextField
                margin="normal"
                required
                id="email"
                label="דוא'ל"
                name="email"
                autoComplete="email"
                autoFocus
                 onChange={(e)=>setEmail(e.target.value)}
                 style ={{width:'80%'}}
                 helperText={emailMessage}
                 error={emailMessage!=''}
              />
              <br/>
              <TextField
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
              /><br/>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"  />}
                label="זכור אותי"
                onClick={handle}
              /><br/>
              <Button
                sx={{  mt: 3, mb: 2 }}
                onClick={handleSubmit}
                variant="contained"
               
                size='large'
                style={{fontSize:'20px'}}
              >
              
                התחבר
              </Button>  
                  
                   <br/>  
                   {!userExist&&<FormHelperText style={{color:"red",display:'flex',justifyContent:'center'}}>*משתמש לא קיים במערכת</FormHelperText>}
                  
                   <br/>
             
               
              
            
            <Link href="#" >
                    שכחת סיסמא?
                  </Link><br/><br/>
          <Link href="#" onClick={NewUser} >
                    אין לך חשבון? פתח חשבון
                  </Link>
          </div>
          </RtlProvider>
   
  );
}