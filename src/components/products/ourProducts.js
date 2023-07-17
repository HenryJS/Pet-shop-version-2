import React from 'react';
import Dog1 from "../assets/dog1.jpg";
import Dog2 from "../assets/dog2.jpg";
import Cat1 from "../assets/cat1.jpg";
import GS3 from "../assets/gs3.jpg";
import GS4 from "../assets/gs4.jpg";
import Horse1 from "../assets/horse1.jpg";
import Footer from "../footer/footer";
import Navbar from '../nav/Navbar';

import './style/products.css';

const ProductsPage = () => {
  return (
    <div>
      <Navbar />
      <header className="header">
        <h1>Our Products</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="Search products..." />
          <button className="secondary-button">Search</button>
        </div>
      </header>

      <div className="product-container">
        <div className="product">
          <img src={Dog1} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
        <div className="product">
          <img src={Dog2} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
        <div className="product">
          <img src={Cat1} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
        <div className="product">
          <img src={GS3} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
        <div className="product">
          <img src={GS4} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
        <div className="product">
          <img src={Horse1} alt="Product" />
          <button className="secondary-button">Buy Now</button>
        </div>
      </div>
      <div>
      <Footer />
    </div>
    </div>

   
  );
};

export default ProductsPage;