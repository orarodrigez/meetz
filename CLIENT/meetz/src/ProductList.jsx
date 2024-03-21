import React from 'react';
import Product from './Product';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function ProductList(props) {
   

    return (
      <div  style={{marginTop:'150px',marginBottom:'30px'}} >
          

<Grid container   direction="row"
  justifyContent="center"
  alignItems="center" >
        {
          props.products.map(product =>  
           
            <Product
              key={product._id}
              product={product}  />
          
          )
        }</Grid>    

      </div>
    );
  }


