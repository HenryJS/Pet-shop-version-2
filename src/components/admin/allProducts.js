import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Nav from './adminnav';
import { useNavigate } from 'react-router-dom';


import './styles/allproducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    return () =>{
       // unsubscribe();
      }
  }, [navigate]);
  //cleaning up the subscription
  

  // Function to handle item deletion
  const handleDeleteItem = async (productId) => {
    try {
      // Delete the item from Firestore based on its ID
      await deleteDoc(doc(db, 'Products', productId));
      // Remove the deleted item from the local state
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

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
              <th>Delete</th> 
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.ProductId}</td>
                <td>{product.ProductName}</td>
                <td>Ksh. {product.ProductPrice}</td>
                <td>
                  <img src={product.ProductImg} alt="/" />
                </td>
                <td>
                  <button className="delete" onClick={() => handleDeleteItem(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}



export default AdminProducts;
