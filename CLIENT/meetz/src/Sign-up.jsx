import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
;
import axios from 'axios'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { FormHelperText } from '@mui/material';

import { useState , useEffect,useRef} from 'react'
import RtlProvider from './RtlProvider'




export default function SignUp(props) {
  const [oldUser, setOldUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cell_no, setCell_no] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house_no, setHouse_no] = useState('');
  const [enter_no, setEnter_no] = useState('');
  const [building, setBuilding] = useState('');
  const [pob, setPob] = useState('');
  const [zip_id, setZip_id] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [cell_noMessage, setCell_noMessage] = useState('');
  const [first_nameMessage, setFirst_nameMessage] = useState('');
  const [last_nameMessage, setLast_nameMessage] = useState('');
  const [cityMessage, setCityMessage] = useState('');
  const [streetMessage, setStreetMessage] = useState('');
  const [house_noMessage, setHouse_noMessage] = useState('');
  const [enter_noMessage, setEnter_noMessage] = useState('');
  const [buildingMessage, setBuildingMessage] = useState('');
  const [pobMessage, setPobMessage] = useState('');
  const [zip_idMessage, setZip_idMessage] = useState('');
  const windowWidth = useRef(window.innerWidth);
  const windowHight = useRef(window.innerHeight);
  const widthP=windowWidth.current>1100?windowWidth.current/2.5:windowWidth.current

  const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonereg =/^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/
  //const name=/^[A-Za-z\u0590-\u05fe][A-Za-z\u0590-\u05fe0-9_ ][A-Za-z\u0590-\u05fe0-9- ][A-Za-z\u0590-\u05fe0-9- "_]+$/i
  const name=/^[A-Za-z\u0590-\u05fe0-9_ -]+$/i
  const pass= /^(?=.*\d)(?=.*\D)(?=.*[a-z]).{5,10}$/; 
  const [valid, setValid] = useState(true)
  const [userExist, setUserExist] = useState(false)
  const [userCreated, setUserCreated] = useState(false)

  const url=import.meta.env.VITE_URL_BASE
  const number=/^[0-9\b]+$/

  async function createUser ()  {
    setUserExist(false);
    if (!check())
      return;
      let user;
      user = await  axios.post(url+'/checkUserEmail',{email})     
    console.log(user.data)
        if (user?.data!=null)
          {   
            setUserExist(true);
            return;
          }
          /*console.log('cell_no='+cell_no+' email='+email+
          '  password='+password+'   first_name='+first_name+
          '  last_name='+last_name+  
          ' city='+city+
          '  street='+street+
          '  house_no='+house_no+
          '  enter_no='+enter_no+
          ' building='+building+
          ' zip_id='+zip_id+
          '  pob='+pob)*/
     user = await  axios.post(url+'/createUser',{cell_no:cell_no,
      email:email,
      password:password,
      first_name:first_name,
      last_name:last_name,  
      city:city,
      street:street,
      house_no:house_no,
      enter_no:enter_no,
      building:building,
      zip_id:zip_id,
      pob:pob}) 
      console.log(user)
        if (user.data!=null)
      {
        
        setUserCreated(true)
        sessionStorage.setItem("User",JSON.stringify({'first_name': user.data.first_name, 'last_name':user.data.last_name,  'cell_no':user.data.cell_no, 'email':user.data.email, 
        'city':user.data.city,    'street':user.data.street,    'house_no':user.data.house_no,    'enter_no':user.data.enter_no,    'building':user.data.building,    'zip_id':user.data.zip_id,    'pob':user.data.pob}))
 
      }

  };
  const handleInput = (e) => {
   
    var valid=true
   

    if (e.target.name=='firstName') 
      {
        if((!name.test(e.target.value)||!e.target.value))
        {   
          setFirst_nameMessage('יש למלא שם תקין')
          valid=false;
        }
      
      else
        setFirst_nameMessage('')
        setFirst_name(e.target.value)
    }
    if (e.target.name=='lastName') 
      {
        if((!name.test(e.target.value)||!e.target.value))
        {   
          setLast_nameMessage('יש למלא שם תקין')
          valid=false;
        }
      else
        setLast_nameMessage('')
        setLast_name(e.target.value)
        }
    if (e.target.name=='city') 
      {if((!name.test(e.target.value)||!e.target.value))
        {   
          setCityMessage('יש למלא יישוב תקין')
              valid=false;
        } 
      else
        setCityMessage('')
        setCity(e.target.value)}
    if (e.target.name=='cell') 
      {if((!phonereg.test(e.target.value)||!e.target.value))
        {   
          setCell_noMessage('יש למלא נייד תקין')
          valid=false;
        }
      else
        setCell_noMessage('')
        setCell_no(e.target.value)
      }
    if (e.target.name=='email')
      {
        if((!emailreg.test(e.target.value)||!e.target.value))
        { 
          setEmailMessage('יש למלא דוא"ל תקין')
          valid=false;
        }
      else
        setEmailMessage('')
        setEmail(e.target.value)
      }
      if (e.target.name=='password')
       { if(!pass.test(e.target.value)||!e.target.value)
          { 
            setPasswordMessage('יש למלא סיסמא תקינה ')
            valid=false;
          }
        else
        setPasswordMessage('')
        setPassword(e.target.value)
       }
    if (e.target.name=='street')
      {if(!name.test(e.target.value)&&e.target.value)
          {   
            setStreetMessage('יש למלא רחוב תקין')
                valid=false;
          } 
      else
        setStreetMessage('')
        setStreet(e.target.value)
      }
    if (e.target.name=='building') 
      {
        if(!number.test(e.target.value)&&e.target.value)
          {   
            setBuilding('יש למלא מס בית תקין')
            valid=false;
          } 
      else
          setBuildingMessage('')
          setBuilding(e.target.value)
        }
    if (e.target.name=='zip_id') 
      {
        if(!number.test(e.target.value))
          {   
            setZip_idMessage('יש למלא מס מיקוד תקין')
                valid=false;
          } 
      else
          setZip_idMessage('')
          setZip_id(e.target.value)
        }
      if (e.target.name=='pob') 
          {
            if(!number.test(e.target.value)&&e.target.value)
              {   
                setPobMessage('יש למלא מס ת.דואר תקין')
                    valid=false;
              } 
          else
              setPobMessage('')
           setPob(e.target.value)
            }
      if (e.target.name=='enter_no') 
              {
                if(!name.test(e.target.value)&&e.target.value)
                  {   
                    setEnter_noMessage('יש למלא מס כניסה תקין')
                        valid=false;
                  } 
                else
                  setEnter_noMessage('')
                setEnter_no(e.target.value)
               }
        if (e.target.name=='house_no') 
          {
            if(!number.test(e.target.value)&&e.target.value)
              {   
                setHouse_noMessage('יש למלא מס דירה תקין')
                    valid=false;
              } 
          else
            setHouse_noMessage('')
            setHouse_no(e.target.value)
          }
   
 
 

            
}
function check()
{
  setEmailMessage('')
  setFirst_nameMessage('')
  setLast_nameMessage('')
  setCityMessage('')
  setCell_noMessage('')
  setPasswordMessage('')
  setStreetMessage('')
  setBuildingMessage('')
  setEnter_noMessage('')
  setZip_idMessage('')
  setHouse_noMessage('')
  setPobMessage('')
 
  var valid=true
  
if (!emailreg.test(email))
{ 
  setEmailMessage('יש למלא דוא"ל תקין')
  valid=false;
}
if (!pass.test(password)) 
{
      setPasswordMessage('יש למלא סיסמא תקינה')
      valid=false;
    }
  if (!name.test(first_name)) 
{
      setFirst_nameMessage('יש למלא שם תקין')
      valid=false;
    }

    if (!name.test(last_name)) 
    {
      setLast_nameMessage('יש למלא שם תקין')
      valid=false;
    }
  
    if (!name.test(city)) 
    { 
      setCityMessage('יש למלא יישוב תקין')
          valid=false;
    } 

if (!phonereg.test(cell_no))
    {   
      setCell_noMessage('יש למלא נייד תקין')
      valid=false;
    }


    if (street!=''&&!name.test(street)) 
    {         
        setStreetMessage('יש למלא רחוב תקין')
            valid=false;
      } 


      if (building!=''&&!number.test(building))
      {     
        setBuilding('יש למלא מס בית תקין')
        valid=false;
      } 
    console.log(valid)
      if (!number.test(zip_id))
      {  
        setZip_idMessage('יש למלא מס מיקוד תקין')
            valid=false;
      } 

      if (pob!=''&&!number.test(pob))
      {  
            setPobMessage('יש למלא מס ת.דואר תקין')
                valid=false;
          } 
      
     if (enter_no!=''&&!name.test(enter_no))
          {          
              setEnter_noMessage('יש למלא מס כניסה  תקין')
                    valid=false;
           } 
    
   if (house_no!=''&&!number.test(house_no))
         {        
             setHouse_noMessage('יש למלא מס דירה תקין')
                valid=false;
          } 

   setValid(valid)
return valid;


}


  return (
    <RtlProvider>
  <div className='newuser'  style={{width:widthP*0.6,marginTop:'150px',marginBottom:'30px'}}>
       
          <Avatar sx={{ m: 1,bgcolor: 'secondary.main' }} style={{margin:'auto'}}>

            <LockOutlinedIcon />
          </Avatar>
          <h2>צור חשבון חדש </h2>
          
                        <TextField
                  required
                  id="email"
                  label="כתובת דואל"
                  name="email"
                  autoComplete="email"
                  onChange={handleInput} 
                  error={emailMessage!=''}
                  helperText={emailMessage}
                  style ={{width:'86%',margin:'3%'}}             
                       autoFocus
                /><br/>
             
                <TextField
                  required
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput} 
                  error={passwordMessage!=''}
                  helperText={passwordMessage}
                  style ={{width:'86%',margin:'3%'}}
                /><br/> 
              
                <TextField
 style ={{width:'86%',margin:'3%'}}
                   required
                  name="cell"
                  label="נייד"
                  id="cell"
                  autoComplete="cell"
                  onChange={handleInput} 
                  error={cell_noMessage!=''}
                  helperText={cell_noMessage}
                /><br/>
                  <h3>כתובת למשלוח</h3>
                  <TextField
 style ={{width:'86%',margin:'3%'}}
                   autoComplete="given-name"
                  name="firstName"
                  required
                  id="firstName"
                  label="שם פרטי"
                  
                  onChange={handleInput} 
                  error={first_nameMessage!=''}
                  helperText={first_nameMessage}
                />
              
                <TextField
 style ={{width:'86%',margin:'3%'}}
                   required
                  margin="normal"
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInput} 
                  error={last_nameMessage!=''}
                  helperText={last_nameMessage}
                />
                <TextField
 style ={{width:'86%',margin:'3%'}}
                   required
                  margin="normal"
                  name="city"
                  label="עיר"
                  id="city"
                  autoComplete="cell"
                  onChange={handleInput} 
                  error={cityMessage!=''}
                  helperText={cityMessage}
                /><br/>
                     <TextField
 style ={{width:'86%',margin:'3%'}}
                   
                  name="street"
                  label="רחוב"
                  id="street"
                  autoComplete="street"
                  onChange={handleInput} 
                  error={streetMessage!=''}
                  helperText={streetMessage}
                />
                <TextField
 style ={{width:'40%',margin:'3%'}}
                 
               name="building"
               label="מס בית "
               id="building"
               autoComplete="building"
               onChange={handleInput} 
               error={buildingMessage!=''}
               helperText={buildingMessage}
             />
 
                   <TextField
 style ={{width:'40%',margin:'3%'}}                   
                  name="house_no"
                  label="מס דירה "
                  id="house_no"
                  autoComplete="house_no"
                  onChange={handleInput} 
                  error={house_noMessage!=''}
                  helperText={house_noMessage}
                /><br/>
                     <TextField
                      style ={{width:'40%',margin:'3%'}}
                  name="enter_no"
                  label="כניסה"
                  id="enter_no"
                  autoComplete="enter_no"
                  onChange={handleInput} 
                  error={enter_noMessage!=''}
                  helperText={enter_noMessage}
                  
                />
                  <TextField
 style ={{width:'40%',margin:'3%'}}
                    name="pob"
                  label="תא דואר "
                  id="pob"
                  autoComplete="pob"
                  onChange={handleInput} 
                  error={pobMessage!=''}
                  helperText={pobMessage}
                /><br/>
                     <TextField
                      style ={{width:'40%',margin:'3%',justifyContent:'right'}}
                  required
                  name="zip_id"
                  label="מיקוד"
                  id="zip_id"
                  autoComplete="zip_id"
                  onChange={handleInput} 
                  error={zip_idMessage!=''}
                  helperText={zip_idMessage}
                />
                <br/>
              <br/>
                <FormControlLabel
                 
                  control={<Checkbox value="allowExtraEmails"  color="primary" />}
                  label="אשמח לקבל עדכונים שוטפים  
                  על מבצעים הנחות ומוצרים חדשים"
                />
                 {!valid&&<FormHelperText style={{color:"red",display:'flex',justifyContent:'center'}}>*הנתונים אינם תקינים</FormHelperText>}
                 {userExist&&<FormHelperText style={{color:"red",display:'flex',justifyContent:'center'}}>*משתמש קיים במערכת</FormHelperText>}
                <br/>
                  <Button
                  style={{fontSize:'18px'}}
               variant="contained"
              sx={{  mt: 3, mb: 2 }}
              onClick={createUser}
            >
              צור חשבון
            </Button>
            {userCreated&&!userExist&&<FormHelperText style={{color:"blue",display:'flex',justifyContent:'center'}}>משתמש הוקם במערכת</FormHelperText>}

           
          
          <br/>
          
           
        </div>
        </RtlProvider>
  );
}