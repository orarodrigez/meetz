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
import { useNavigate } from "react-router-dom"




export default function NewPass(props) {
    const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const handle = () => {
    setCookie('email', email, { path: '/' });
    setCookie('Password', pwd, { path: '/' });
 };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const NewUser = (e) => {
    console.log('event')
    props.callback('1') 
  };
  return (
    
         <div className='hh'> 
          
          <Avatar sx={{ m: 1,bgcolor: 'secondary.main' }} style={{margin:'auto'}}>

          <LockOutlinedIcon />
          </Avatar>
            < h2>התחבר</h2>
              

              
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ '& > :not(style)': {m: 1}}} >
              <TextField
                margin="normal"
                required
                id="email"
                label="דוא'ל"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}

              />
              <br/>
              <TextField
                margin="normal"
                required
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pwd}
              /><br/>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"  />}
                label="זכור אותי"
                onClick={handle}
              /><br/>
              <Button
                type="submit"
                
                variant="contained"
                
              >
              
                התחבר
              </Button>  
                  
                   <br/><br/>
             
               
              
            </Box>
            <Link href="#" >
                    שכחת סיסמא?
                  </Link><br/><br/>
          <Link href="#" onClick={NewUser} >
                    אין לך חשבון? פתח חשבון
                  </Link>
          </div>
   
  );
}