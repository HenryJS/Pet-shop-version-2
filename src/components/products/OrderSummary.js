import React, { useState } from 'react';
import { useCart } from './cartcontext';
import Footer from '../footer/footer';
import './style/summary.css';
import Navbar from '../nav/Navbar';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleProceed = () => {
    // Validate user input
    if (name && address && paymentMethod) {
      // Pass user details and cart items as state to OrderConfirmation
      navigate('/confirm', {
        state: { name, address, paymentMethod, cartItems, totalPrice },
      });
    } else {
      console.log('error proceeding');
    }
  };
  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };
  
  return (
    <>
    <Navbar />
      <div className="order-summary-container">
        <h2>Order Summary</h2>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th> 
              <th>Remove</th>
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
                <td>
                  <button className='remove-button' onClick={() => handleRemoveItem(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='Total-txt'>
          <p>Total Price: Ksh {totalPrice}</p>
        </div>
      </div>
      <div className="checkout-table">
        <h3>Checkout</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
              type="text" 
              id="name" 
              placeholder='John Doe' 
              value={name}
              onChange={handleNameChange}/>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input 
              type="text" 
              id="address" 
              value={address}
              onChange={handleAddressChange}/>
        </div>
        <div>
          <label htmlFor="payment-method">Payment Method:</label>
          <select 
              id="payment-method" 
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
              >
            <option value="card">Card</option>
            <option value="mpesa">M-pesa</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        <button className="proceed-button" onClick={handleProceed}>
      Proceed
    </button>
      </div>
      <Footer/>
    </>
  );
};

export default OrderSummary;
