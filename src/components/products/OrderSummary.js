import React, { useState } from 'react';
import { useCart } from './cartcontext';
import Footer from '../footer/footer';
import './style/summary.css';
import Navbar from '../nav/Navbar';
import { useNavigate } from 'react-router-dom';
import { ordersCollection, addDoc } from '../../firebase';

const OrderSummary = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card', 'mpesa', 'payment on delivery');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleUserAddressChange = (e) => {
    setUserAddress(e.target.value);
  };
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleProceed = async () => {
    if (userName && userAddress && paymentMethod) {
      try {
        const orderItems = cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        // Create a new document in the 'Orders' collection using 'colRef'
        await addDoc(ordersCollection, {
          userName,
          userAddress,
          paymentMethod,
          orderItems,
          totalPrice,
          timestamp: new Date(),
        });

        // Redirect the user to the confirmation page
        navigate('/confirm', {
          state: {
            userName,
            userAddress,
            paymentMethod,
            orderItems,
            totalPrice,
          },
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.log('Error proceeding');
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
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            placeholder='John Doe'
            value={userName}
            onChange={handleUserNameChange} />
        </div>
        <div>
          <label htmlFor="userAddress">Address:</label>
          <input
            type="text"
            id="userAddress"
            value={userAddress}
            onChange={handleUserAddressChange} />
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
      <Footer />
    </>
  );
};

export default OrderSummary;
