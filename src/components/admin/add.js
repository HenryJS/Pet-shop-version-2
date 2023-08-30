import React, { useState } from 'react';
import { colRef, addDoc, deleteDoc, doc } from '../../firebase'; 
import './styles/admin.css';

const Add = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [deleteProductId, setDeleteProductId] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Using Firebase addDoc function to add data
    addDoc(colRef, {
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
    })
      .then(() => {
        // Reset the form fields after successful submission
        setProductId('');
        setProductName('');
        setProductPrice('');
        setProductImage('');
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
      });
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      // Delete the document using the product ID
      await deleteDoc(doc(colRef, deleteProductId));
      console.log('Document deleted successfully.');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }

    // Clear the form field
    setDeleteProductId('');
  };

  return (
    <div>
      <form className="add" onSubmit={handleAddProduct}>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="text"
          name="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />

        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="text"
          name="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />

        <label htmlFor="productImage">Product Image URL:</label>
        <input
          type="text"
          name="productImage"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          required
        />

        <button type="submit">Add a new pet product</button>
      </form>

      <form className="delete" onSubmit={handleDeleteProduct}>
        <label htmlFor="deleteProductId">Product ID:</label>
        <input
          type="text"
          name="deleteProductId"
          value={deleteProductId}
          onChange={(e) => setDeleteProductId(e.target.value)}
          required
        />

        <button type="submit">Delete a pet product</button>
      </form>
    </div>
  );
};

export default Add;