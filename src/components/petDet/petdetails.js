import React from 'react';
import PetImage from "../assets/cat1.jpg";
import Footer from '../footer/footer';
import Navbar from '../nav/Navbar';

import "./style/petdetails.css"

const petdetails = () => {
  return (
    <>
    <Navbar/>
     <div className="pet-details-container">
      <h1 className="pet-details-heading">Pet Details</h1>
      <div className="pet-info">
        <div className="pet-image-container">
          <img src={PetImage} alt="Pet" className="pet-image" />
        </div>
        <div className="pet-description">
          <h2 className="pet-title">Pet Description</h2>
          <p className="pet-name">Name: Fido</p>
          <p className="pet-color">Color: Grey</p>
          <p className="pet-price">Price: Ksh.10,000</p>
          <button className="buy-now-button">Buy Now</button>
        </div>
      </div>
      <Footer />
    </div>
    </>
   
  );
};

export default petdetails;