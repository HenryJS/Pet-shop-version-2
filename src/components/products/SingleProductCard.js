import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useCart } from "./cartcontext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AddCircle, RemoveCircle, Delete } from "@mui/icons-material";
import "./style/singleproduct.css";

const SingleProductCard = ({ name, price, imageId }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const user = auth.currentUser;

  const [imageURL, setImageURL] = useState('');
  const imageRef = ref(storage, `${imageId}`); 

  useEffect(() => {
    // Fetch the download URL when the component mounts
    getDownloadURL(imageRef)
      .then((downloadURL) => {
        setImageURL(downloadURL);
      })
      .catch((error) => {
        console.error('Error fetching download URL:', error);
      });
  }, [imageRef]);

  const cartItem = cartItems.find((item) => item.id === imageId);

  const handleAddToCart = () => {
    if (user) {
      addToCart({ id: imageId, name, price });
    } else {
      navigate("/login");
    }
  };

  // New function to handle product click and navigate to product detail page
  const handleProductClick = () => {
    navigate(`/product/${imageId}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        {imageURL ? (
          <img src={imageURL} className="product-image" alt="product" />
        ) : (
          <div>Loading image...</div>
        )}
      </div>
      <h3 className="product-name">{name}</h3>
      <p className="product-price">Price: Ksh {price}</p>
      <button
        className="cart-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling
          handleAddToCart();
        }}
      >
        {cartItem ? (
          <>
            <RemoveCircle onClick={() => decreaseQuantity(cartItem)} className="cart-icon" />
            {cartItem.quantity}
            <AddCircle onClick={() => increaseQuantity(cartItem)} className="cart-icon" />
            <Delete onClick={() => removeFromCart(cartItem)} className="cart-icon" />
          </>
        ) : (
          <>Add to Cart</>
        )}
      </button>
    </div>
  );
};

export default SingleProductCard;
