import * as React from 'react';
import { useState , useEffect,useRef,useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import logoImg from './images/logo13.jpg';
import Popover from '@mui/material/Popover';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SignInSide from './Sign-in';
import ShortCart from './ShortCart';
import { CartContext } from './context/cart.jsx'
import Badge from '@mui/material/Badge';


export default function Bar(props) {
  const { cartItems, addToCart , removeFromCart} = useContext(CartContext)

  const [user, setUser] = useState(null);
  const [oldUser, setoldUser] = useState(null);
  const [showCert, setShowCert] = useState(null);
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
     color:'#aaaaaa'
    },
   
    [`& .${tooltipClasses.tooltip}`]: {

      fontSize: '15px',
      borderRadius: '5px',
     background:'#aaaaaa',

    },
  }));
  
  const handleClick = (event) => {
    setShowCert(null);
    if (user==null)
       setoldUser(event.currentTarget);
    else
       {
        props.callback(4);
       }
  };
  const handleClickCart = (event) => {
 
   setoldUser(null);
      if (showCert==null)
      {
        
        setShowCert(event.currentTarget);
      
        
      }
      else
      {
        props.callback(5);
      }
    
     
  };
  useEffect(() => {
        
    initillize()
  },[])
  const handleClose = (event) => {
    
        setoldUser(null);
       
        
          setShowCert(null);
        
    
  };

  const openOlduser = Boolean(oldUser);
  const idOldUser = openOlduser ? 'simple-popover' : undefined;
  const openShowCert = Boolean(showCert);
  const idShowCert = openShowCert ? 'simple-popover': undefined;

 
  
  function initillize()
  {
    //const temp = JSON.parse(sessionStorage.getItem("User"));
   console.log(props)
    if (props.user!=null&&props.user!='')
      setUser(props.user)
  
  }
  const Sign = (value) => 
  {
 
    setoldUser(null);
    if (value!=null)
    {
        props.callback(value);
        const temp = JSON.parse(sessionStorage.getItem("User"));
        setUser(temp)
    }
  }
  const cert = (value) => 
  {
 
    setShowCert(null);
    if (value!=null)
    {
        props.callback(value);
        const temp = JSON.parse(sessionStorage.getItem("User"));
        if (temp!=null)
          setUser(temp)
    }
  }
  
  return (
    <>
    
      <AppBar  style={{ 
         background: '#ffff'}} >
            <Toolbar aria-labelledby>
              
            <Box display={'flex'}  flexGrow={1} >   
            <IconButton   onClick={handleClickCart} disableRipple  >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingBagOutlinedIcon fontSize='large' aria-label='cart' /></Badge>
            </IconButton> 
               {user==null&&<IconButton onClick={handleClick} disableRipple > 
           
              <PersonOutlineOutlinedIcon style={{paddingRight:'3vw',paddingLeft:'1vw'}}  fontSize='large' />
            </IconButton>}      
            {user&&<BootstrapTooltip title={<div >לאזור האישי</div>}  onClick={handleClick}    slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -25],
              },
            },
          ],
        },
      }}>  
           
           
            <IconButton onClick={handleClick} disableRipple > 
            <h3 > {user.first_name+" "+user.last_name}</h3>
            
              <PersonOutlineOutlinedIcon style={{paddingRight:'3vw',paddingLeft:'1vw'}}  fontSize='large' />
              
            </IconButton> 
           </BootstrapTooltip>}
        
               
          
          </Box> <img  height="120ch" width="120ch"  src={logoImg} onClick={()=>props.callback(6)} ></img> 
          
          <Popover
        
        id={idOldUser}     
        open={openOlduser}
        anchorEl={oldUser}
        onClose={handleClose}
        style={{marginLeft:'2%'}}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        >
        <SignInSide callback={Sign}/>
  
   </Popover> 
   <Popover
        id={idShowCert}
       
        
        open={openShowCert}
        anchorEl={showCert}
        onClose={handleClose}
        style={{marginLeft:'1%'}}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        > <ShortCart />
        </Popover>
        
    
   {/*newUser&&<SignUp callback={Sign}/>*/}
  
       
      
        </Toolbar>
      
      </AppBar>
      
     
</>
  );
}