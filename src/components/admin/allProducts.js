import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Nav from './adminnav';

import './styles/allproducts.css'


function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from Firestore
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Products'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <Nav />
    <h2 className="admin-products-heading">All Products</h2>
    <div className="admin-products-container">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.ProductId}</td>
              <td>{product.ProductName}</td>
              <td>Ksh. {product.ProductPrice}</td>
              <td>
                <img
                  src={product.ProductImg}
                  alt={product.ProductName} 
                  className="admin-product-image"
                />
              </td>
              <td>{product.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    
  );
}

export default AdminProducts;
