import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState , useEffect} from 'react'
import {Buffer} from 'buffer';

export default function Product(props) {
  let {product}=props;
  const [imageData, setImageData] = useState(props.product.picture1.data);
  const [imageUrl, setImageUrl] = useState('');

  const [BufferData, setBufferData] = useState(props.product.picture1.data);

  const initillize=()=>{
  
    const imageBlob = new Blob([imageData.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(imageBlob);
    setImageUrl(imageUrl);
    console.log(URL.revokeObjectURL(imageUrl))
}

  useEffect(() => {
    
    initillize()
  },[imageData])

  return (
    <div /*class="hh"*/> 
   
   <Card sx={{ maxWidth: 545 }}>
      <CardMedia
        component="img"
        alt={product.prodName}
        height="140"
        
        /*src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}*/
        src={`data:${imageData.contentType};base64,${Buffer.from(imageData.data).toString('base64')}`}


      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
           {product.prodName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            product.description
          }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">הוסף לעגלה</Button>
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
