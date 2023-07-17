import React from 'react';
import petImage from '../assets/cat1.jpg'; 
import Navbar from '../nav/Navbar';
import Footer from '../footer/footer';

import "./style/checkout.css";

const Checkout = () => {
  return (
    <>
    <Navbar />
     <div className="checkout-container">
    <div className="order-summary">
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Pet</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="pet-details">
                <img src={petImage} alt="Pet" className="peet-image" />
                <span className="pet-name">Fido</span>
              </div>
            </td>
            <td>Ksh. 10,000</td>
            <td>1</td>
            <td>Ksh. 10,000</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="checkout-details">
      <div className="address-box">
        <table className="address-table">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input type="text" id="name" placeholder='John Doe' />
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input type="text" id="address"  placeholder='0100 Nairobi'/>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="checkout-button">Checkout</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
<Footer/>
    </>
   
  );
};

export default Checkout;
