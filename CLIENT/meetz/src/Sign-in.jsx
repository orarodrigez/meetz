import * as React from 'react';
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
import { useState , useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import RtlProvider from './RtlProvider';






export default function SignInSide(props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const handle = () => {
    setCookie('email', email, { path: '/' });
    setCookie('Password', pwd, { path: '/' });
 };


 const navigate = useNavigate()

  async function handleSubmit () {
  

    const user = await  axios.post(url+'/checkUser/',{email:email, password:pwd}) 
    if (user!=null) 
    sessionStorage.setItem("User",JSON.stringify({'firstName': user.firstName, 'lastName':user.lastName,  'cell_no':user.cell_no, 'email':user.email, 
    'city':user.city,    'street':user.street,    'house_no':user.house_no,    'enter_no':user.enter_no,    'building':user.building,    'zip_id':user.zip_id,    'pob':user.pob}))

   
  };
  const NewUser = () => {
    props.callback(1);

  }
  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>1100?windowWidth.current/4:windowWidth.current


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
                 onChange={(e)=>setEmail(email)}
                 style ={{width:'80%'}}
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
                onChange={(e)=>setPwd(pwd)}
                

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
                  
                   <br/><br/>
             
               
              
            
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