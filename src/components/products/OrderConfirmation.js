import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from '../nav/Navbar';
import Footer from '../shared/footer';
import './style/confirmation.css'; 

const OrderConfirmation = () => {
  const { state } = useLocation(); // Get location state

  // Retrieve user details and cart items from location state
  const { name, address, paymentMethod, cartItems, totalPrice } = state;

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
  }, []);

  return (
    <>
       <Navbar />
      <div className="order-confirmation-container">
        <h2>Order Confirmation</h2>

        {/* Display Payment Method */}
        <p className="confirmation-info">Payment Method: {paymentMethod}</p>

        {/* Display User Details */}
        <div className="user-details">
          <h3>User Details:</h3>
          <p className="confirmation-info">Name: {name}</p>
          <p className="confirmation-info">Address: {address}</p>
        </div>


        {/* Display Order Summary */}
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

        <div className="Total-txt">
          <p>Total Price: Ksh {totalPrice}</p>
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
