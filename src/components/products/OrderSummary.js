import React from 'react';
import { useCart } from '../products/cartcontext'; 
import Navbar from '../nav/Navbar';
import Footer from '../footer/footer';
import './style/summary.css'; 

const OrderSummary = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart(); 

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  return (
    <>
    <Navbar/>
     <div className="order-summary-container">
      <h2>Order Summary</h2>
      <table className="order-summary-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
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
          <input type="text" id="name" placeholder='John Doe'/>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" />
        </div>
        <div>
          <label htmlFor="payment-method">Payment Method:</label>
          <select id="payment-method">
            <option value="card">Card</option>
            <option value="mpesa">M-pesa</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        <button className="proceed-button">Proceed</button>
      </div>
     <Footer/>
    </>
   
  );
};

export default OrderSummary;
