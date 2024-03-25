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

export default function ProductItem(props) {
  let {product}=props;
  const [imageData, setImageData] = useState(props.product.picture1.data);

  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>800?windowWidth.current/4:windowWidth.current
  const windowHeight = useRef(window.innerHeight);
  const Height =windowHeight.current>800?windowHeight.current/4:windowHeight.current
  const handleClickCart = (event) => {
  
  };
  const handleClickProduct = (event) => {
  
  };
  return (
    <div  style={{margin:'3%'}} className='card' >

   <Card  sx={{ width: widthP*0.6,minWidth: 265}} >
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
        <IconButton onClick={handleClickProduct} disableRipple > 
           
           <VisibilityOutlinedIcon   style={{paddingRight:'1vw',paddingLeft:'1vw'}}  fontSize='large' />
         </IconButton>
    
      </CardActions>
      
    </Card>

  

    </div>
  )
}
