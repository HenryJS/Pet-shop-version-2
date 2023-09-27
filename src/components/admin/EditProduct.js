import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Nav from './adminnav';

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ProductName: '',
    ProductPrice: '',
    ProductImg: '',
  });

  useEffect(() => {
    // Fetch the product details from Firestore and populate the form fields
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'Products', productId);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct(productData);
        } else {
          // Handle the case where the product with the given ID doesn't exist
          console.error(`Product with ID ${productId} not found.`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const productDoc = doc(db, 'Products', productId);
      await updateDoc(productDoc, {
        ProductName: product.ProductName,
        ProductPrice: parseFloat(product.ProductPrice),
        ProductImg: product.ProductImg,
      });

      // Redirect back to the admin products page after updating
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
    <Nav/>
      <h2>Edit Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="ProductName">Product Name:</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            value={product.ProductName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ProductPrice">Product Price:</label>
          <input
            type="number"
            id="ProductPrice"
            name="ProductPrice"
            value={product.ProductPrice}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ProductImg">Product Image URL:</label>
          <input
            type="text"
            id="ProductImg"
            name="ProductImg"
            value={product.ProductImg}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
