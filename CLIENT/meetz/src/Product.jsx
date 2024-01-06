import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
export default function Product(props) {
  let {product}=props;

  return (
    <div /*class="hh"*/> 
   
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.picture}
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
