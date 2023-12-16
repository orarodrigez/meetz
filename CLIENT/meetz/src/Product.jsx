import React from 'react'

export default function Product(props) {
  let {product}=props;

  return (
    <div class="hh"> 
    <RtlProvider>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.picture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
           {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            props.description
          }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">הוסף לעגלה</Button>
        <Button size="small">הצג מוצר</Button>
      </CardActions>
    </Card>

    </RtlProvider>
  {  /*  prod_name:{required:true,type:string},
price:{required:true,type:string},
description:{required:true,type:string},
picture:{required:true,type:string},
stock:{required:true,type:int},
  prod_id:{required:true,type:int}*/}


    </div>
  )
}
