# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Given this is the allProducts.js: import React, { useEffect, useState } from 'react';
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

  const handleEditItem = (productId) => {
    // You can navigate to an edit page or show a modal for editing here
    // Example: navigate(`/edit-product/${productId}`);
    console.log(`Edit product with ID: ${productId}`);
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
              <th>Actions</th> 
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
                <td>
                  <button
                    className="edit" 
                    onClick={() => handleEditItem(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete" 
                    onClick={() => handleDeleteItem(product.id)}
                  >
                    Delete
                  </button>
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
abd this is where im adding them: import React, { useState } from 'react';
import { colRef, addDoc, deleteDoc, doc } from '../../firebase'; 
import { getStorage, ref, uploadString } from 'firebase/storage'; 
import { getDownloadURL } from 'firebase/storage';
import Nav from './adminnav';

import './styles/admin.css';

const Add = () => {
  const [ProductId, setProductId] = useState('');
  const [ProductName, setProductName] = useState('');
  const [ProductPrice, setProductPrice] = useState('');
  const [ProductImg, setProductImage] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

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
    setDeleteMessage('Product deleted successfully');
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

      <form className="delete" onSubmit={handleDeleteProduct}>
        <label htmlFor="deleteProductId">Product ID:</label>
        <input
          type="text"
          name="deleteProductId"
          value={deleteProductId}
          onChange={(e) => setDeleteProductId(e.target.value)}
          required
        />
        {deleteMessage && <div className='delete-message'>{deleteMessage}</div>}
        <button type="submit">Delete a pet</button>
      </form>
    </div>
  );
};

export default Add;
How can i make the edit button functional, such that if i click it, i can change the product id, productname product price? 