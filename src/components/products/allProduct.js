import React, { useContext } from 'react';
import { ProductsContext } from './ProductsContext';
import { useCart } from './cartcontext';

 const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(useCart);

  return (
    <>
      {products.length !== 0 && <h1>Products</h1>}
      <div className='products-container'>
        {products.length === 0 && <div>Slow internet...no products to display</div>}
        {products.map(product => (
          <div className='product-card' key={product.ProductID}>
            <div className='product-img'>
              <img src={product.ProductImg} alt="not found" />
            </div>
            <div className='product-name'>
              {product.ProductName}
            </div>
            <div className='product-price'>
              Ksh. {product.ProductPrice}.00
            </div>
            <button
              className='addcart-btn'
              onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;