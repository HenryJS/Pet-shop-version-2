import React from 'react';
import Dog1 from "../assets/dog1.jpg";
import Dog2 from "../assets/dog2.jpg";
import Cat1 from "../assets/cat1.jpg";
import GS3 from "../assets/gs3.jpg";
import GS4 from "../assets/gs4.jpg";
import Horse1 from "../assets/horse1.jpg";
import Footer from "../footer/footer";
import Navbar from '../nav/Navbar';
import { useCart } from '../products/cartcontext'; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import './style/products.css';

const ProductsPage = () => {
  const { cartItems, totalPrice, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart(); 

  const products = [
    { id: 1, name: "Japanese Spitz", image: Dog1, price: 10000 },
    { id: 2, name: "St. Bernard", image: Dog2, price: 15000 },
    { id: 3, name: "Fluffy Cat", image: Cat1, price: 8000 },
    { id: 4, name: "German Shepherd 3", image: GS3, price: 20000 },
    { id: 5, name: "German Shepherd 4", image: GS4, price: 18000 },
    { id: 6, name: "Horse", image: Horse1, price: 50000 },
  ];

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getProductQuantityInCart = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const renderCartButtons = (product) => {
    const productId = product.id;
    const quantityInCart = getProductQuantityInCart(productId);
  
    if (isProductInCart(productId)) {
      return (
        <div className="cart-buttons-container">
          <button className="secondary-button" onClick={() => decreaseQuantity(product)}>
            <RemoveIcon />
          </button>
          <span>{quantityInCart}</span>
          <button className="secondary-button" onClick={() => increaseQuantity(product)}>
            <AddIcon />
          </button>
          <button className="remove-button" onClick={() => removeFromCart(product)}>
            <DeleteIcon />
          </button>
        </div>
      );
    } else {
      return (
        <button className="secondary-button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      );
    }
  };
  return (
    <div>
      <Navbar cartItems={cartItems} totalPrice={totalPrice} />
      <header className="header" id="top">
        <h1>Our Products</h1>
      </header>

      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: Ksh {product.price}</p>
            {renderCartButtons(product)}
          </div>
        ))}
      </div>
     
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;