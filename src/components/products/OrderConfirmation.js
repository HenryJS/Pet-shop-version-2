import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../nav/Navbar';
import Footer from '../shared/footer';
import './style/confirmation.css';
import { useCart } from './cartcontext';

const OrderConfirmation = () => {
  const { state } = useLocation(); // Get location state
  const { cartItems } = useCart();

  // Retrieve user details and cart items from location state
  const { userName, userAddress, paymentMethod, totalPrice } = state;

  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Automatically hide the banner after 5 seconds
    const bannerTimer = setTimeout(() => {
      setShowBanner(false);
    }, 5000);

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(bannerTimer);
    };
  }, [userName, userAddress, paymentMethod, cartItems, totalPrice]);

  return (
    <>
      <Navbar />
      <div className="order-confirmation-container">
        <h2>Order Confirmation</h2>

        <div className="confirmation-details">
          <div className="confirmation-info">
            <h3>User Details:</h3>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Address:</strong> {userAddress}</p>
          </div>

          <div className="confirmation-info">
            <h3>Payment Method:</h3>
            <p>{paymentMethod}</p>
          </div>
        </div>

        <div className="confirmation-info">
          <h3>Order Summary:</h3>
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} className="product-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>Ksh {item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Total-txt">
          <p><strong>Total Price:</strong> Ksh {totalPrice}</p>
        </div>

        {showBanner && (
          <div className="success-banner">
            <p>Order placed successfully!</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
