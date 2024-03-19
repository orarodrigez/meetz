import React from 'react';
import Product from './Product';



export default function ProductList(props) {
   

    return (
      <div>
        {
          props.products.map(product =>  
           
            <Product
              key={product._id}
              product={product} />
          
          )
        }
      </div>
    );
  }


