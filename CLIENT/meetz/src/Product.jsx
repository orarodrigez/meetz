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

export default function Product(props) {
  let {product}=props;
  const [imageData, setImageData] = useState(props.product.picture1.data);

  const windowWidth = useRef(window.innerWidth);
  const widthP=windowWidth.current>800?windowWidth.current/4:windowWidth.current
  const windowHeight = useRef(window.innerHeight);
  const Height =windowHeight.current>800?windowHeight.current/4:windowHeight.current

  return (
    <div  style={{margin:'3%'}} className='card' >

   <Card  sx={{ width: widthP*0.6,minWidth: 250}} >
      <CardMedia
        component="img"
        alt={product.prodName}
        height={Height*0.7}
        /*src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}*/
        src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}


      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div"         height={Height*0.2}>
           {product.prodName}
        </Typography>
        <Typography variant="body2" color="text.secondary"         height={Height*0.2}    >
          {
            product.description
          }
        </Typography>
      </CardContent>
      
      
      <CardActions ><Box display={'flex'}  flexGrow={1} > 
        <Button size="small">הוסף לעגלה</Button></Box>
        <Button size="small">הצג מוצר</Button>
      </CardActions>
      
    </Card>

    
  {  /*  prod_name:{required:true,type:string},
price:{required:true,type:string},
description:{required:true,type:string},
picture:{required:true,type:string},
stock:{required:true,type:int},
  prod_id:{required:true,type:int}*/}


    </div>
  )
}
