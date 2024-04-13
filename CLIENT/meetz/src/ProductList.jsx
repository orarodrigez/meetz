import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Product from './ProductItem';
import ProductItem from './ProductItem';

export default function ProductList(props) {
  

    return (
      <div  style={{marginTop:'150px',marginBottom:'30px'}} >
          

<Grid container   direction="row"
  justifyContent="center"
  alignItems="center"  >
        { 
          props.products.map(product =>  
          
            <ProductItem 
          
              key={product._id}
              product={product}  
             />
          
          )
        }</Grid>    

      </div>
    );
  }


