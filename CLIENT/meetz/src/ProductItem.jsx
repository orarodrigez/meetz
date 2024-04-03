import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState , useEffect,useRef} from 'react'
import {Buffer} from 'buffer';
import Box from '@mui/material/Box';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import ProductDetails from './ProductDetails';
import CloseIcon from '@mui/icons-material/Close';
   import Modal from '@mui/material/Modal';

export default function ProductItem(props) {
  let {product}=props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [imageData, setImageData] = useState(props.product.picture1.data);

  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>800?windowWidth.current/2:windowWidth.current
  const windowHeight = useRef(window.innerHeight);
  const Height =windowHeight.current>800?windowHeight.current/4:windowHeight.current
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: widthP,
  height:Height*2,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

  const handleClickCart = (event) => {
  
  };
  const handleClickProduct = (event) => {
  
  };
  return (
    <div  style={{margin:'2%'}} className='card' >

   <Card  sx={{ width: widthP*0.7,minWidth: 265,maxWidth: 365}} >
      <CardMedia
        component="img"
        alt={product.prodName}
        height={Height*0.9}
        /*src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}*/
        src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}


      />
      <CardContent >
        
        <Typography gutterBottom variant="h5" component="div"         height={Height*0.12}>
           {product.prodName}
        </Typography>
        <Typography variant="body2" color="text.secondary"         height={Height*0.2}    >
          {
            product.description
          }
        </Typography>
      </CardContent>
      
      
      <CardActions  ><Box display={'flex'}  flexGrow={1} > 
  
              <IconButton onClick={handleClickCart} disableRipple > 
           
              <AddShoppingCartOutlinedIcon style={{paddingRight:'1vw',paddingLeft:'1vw'}}  fontSize='large' />
            </IconButton>
        </Box>
        <IconButton onClick={handleClickOpen} disableRipple > 
           
           <VisibilityOutlinedIcon   style={{paddingRight:'1vw',paddingLeft:'1vw'}}  fontSize='large' />
         </IconButton>
    
      </CardActions>
      
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
       
      >   
          <Box sx={style}>
            <div style={{direction:'rtl'}}>
         <IconButton
              
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon /></IconButton>
          </div>
        <ProductDetails product={product}/></Box>
        </Modal>
            </div>
  )
}
