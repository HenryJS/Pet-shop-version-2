import React, { useState } from 'react';
import { colRef, addDoc } from '../../firebase'; 
import { getStorage, ref, uploadString } from 'firebase/storage'; 
import { getDownloadURL } from 'firebase/storage';
import Nav from './adminnav';

import './styles/admin.css';

const Add = () => {
  const [ProductId, setProductId] = useState('');
  const [ProductName, setProductName] = useState('');
  const [ProductPrice, setProductPrice] = useState('');
  const [ProductImg, setProductImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    try {
      let imageUrl = '';
  
      // Upload the selected image to Firebase Storage
      if (ProductImg) {
        const storage = getStorage(); // Get the storage instance
        const storageRef = ref(storage, `ProductImages/${ProductImg.name}`);
  
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(ProductImg);
  
        reader.onload = async (event) => {
          const dataURL = event.target.result;
  
          // Upload the image file as a base64-encoded string
          await uploadString(storageRef, dataURL, 'data_url');
  
          // Get the download URL of the uploaded image
          imageUrl = await getDownloadURL(storageRef);
  
          // Using Firebase addDoc function to add data
          await addDoc(colRef, {
            ProductId: ProductId,
            ProductName: ProductName,
            ProductPrice: ProductPrice,
            ProductImg: imageUrl,
          });
  
          setSuccessMessage('Product added successfully');
  
          // Reset the form fields after successful submission
          setProductId('');
          setProductName('');
          setProductPrice('');
          setProductImage(null);
        };
      }
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };
  
  



  return (
  <div>
    <Nav />
  <div className="title">Add Products</div>
      <form className="add" onSubmit={handleAddProduct}>
        <label htmlFor="productId">Product ID:</label>
        <input
          type="text"
          name="productId"
          value={ProductId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />

        <label htmlFor="ProductName">Product Name:</label>
        <input
          type="text"
          name="ProductName"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label htmlFor="ProductPrice">Product Price:</label>
        <input
          type="text"
          name="ProductPrice"
          value={ProductPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />

        <label htmlFor="ProductImage">Product Image:</label>
        <input
          type="file"
          name="ProductImage"
          onChange={(e) => setProductImage(e.target.files[0])}
          accept="image/*" // Allow only image files
          required
        />
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Add a new pet </button>
      </form>

    
    </div>
  );
};

export default Add;
