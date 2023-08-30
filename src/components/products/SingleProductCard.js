import React from "react";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useCart } from "./cartcontext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AddCircle, RemoveCircle, Delete } from "@mui/icons-material";
import "./style/singleproduct.css";

export default function SingleProductCard({ name, price, imageId }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const user = auth.currentUser;
  const [downloadUrl] = useDownloadURL(ref(storage, `ProductImages/${imageId}.jpg`));

  const cartItem = cartItems.find((item) => item.id === imageId);

  const handleAddToCart = () => {
    if (user) {
      addToCart({ id: imageId, name, price });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={downloadUrl} className="product-image" alt="product" />
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
}
