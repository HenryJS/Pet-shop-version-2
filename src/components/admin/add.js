import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Adjust the path to your firebase.js file
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/storage';
import './styles/admin.css'; 

function Add() {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Firebase Storage and get the URL
    const storageRef = ref(storage, `product_images/${productImage.name}`);
    await uploadBytes(storageRef, productImage);

    // Get the image URL
    const imageUrl = await storage.ref().child(`product_images/${productImage.name}`).getDownloadURL();

    // Add the product to Firebase Firestore
    const productsRef = collection(db, 'Products');
    await addDoc(productsRef, {
      ProductName: productName,
      ProductId: productId,
      ProductPrice: parseFloat(productPrice),
      ProductImg: imageUrl,
    });

    // Reset form fields after submission
    setProductName('');
    setProductId('');
    setProductPrice('');
    setProductImage(null);
  };

  return (
    <div className='add-container'>
      <h2>Add Product</h2>
      <form className='add-form' onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Product ID:
          <input
            type='text'
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </label>
        <label>
          Product Price:
          <input
            type='number'
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Product Image:
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            required
          />
        </label>
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
}

export default Add;
