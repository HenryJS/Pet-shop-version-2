import React, { useState } from 'react';
import Dog1 from "../assets/dog1.jpg";
import Dog2 from "../assets/dog2.jpg";
import Cat1 from "../assets/cat1.jpg";
import GS3 from "../assets/gs3.jpg";
import GS4 from "../assets/gs4.jpg";
import Horse1 from "../assets/horse1.jpg";
import Footer from "../footer/footer";
import Navbar from '../nav/Navbar';
import OrderSummary from './OrderSummary'; // Import the OrderSummary component

import './style/products.css';

const ProductsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const products = [
    { id: 1, name: "Japanese Spitz", image: Dog1, price: 10000 },
    { id: 2, name: "St. Bernard", image: Dog2, price: 15000 },
    { id: 3, name: "Fluffy Cat", image: Cat1, price: 8000 },
    { id: 4, name: "German Shepherd 3", image: GS3, price: 20000 },
    { id: 5, name: "German Shepherd 4", image: GS4, price: 18000 },
    { id: 6, name: "Horse ", image: Horse1, price: 50000 },
  ];

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    const newTotalPrice = totalPrice + product.price;
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    const newTotalPrice = totalPrice - item.price;
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  return (
    <div>
      <Navbar cartItems={cartItems} totalPrice={totalPrice} />
      <header className="header">
        <h1>Our Products</h1>
      </header>

      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: Ksh{product.price}</p>
            <button className="secondary-button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? <OrderSummary cartItems={cartItems} removeFromCart={removeFromCart} /> : <p>No items in the cart.</p>}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;