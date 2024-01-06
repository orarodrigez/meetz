import React from 'react';
import Product from './product';



export default function ProductList(props) {
   

    return (
      <div>
        {
          props.products.map(product => (
            <Product
              key={product.id}
              product={product} />
          ))
        }
      </div>
    );
  }


