import React from 'react';
import Product from '/Product';

class ProductList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.products.map(product => (
            <Product
              key={product.id}
              product={product} />
          ))
        }
      </div>
    );
  }
}
async function getProducts() {
    const response = await fetch('https://dummyjson.com/products')  // fetch the products
    const data = await response.json() // convert the response to json
    setProducts(data.products) // set the products in the state to the products we fetched
  }
ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;