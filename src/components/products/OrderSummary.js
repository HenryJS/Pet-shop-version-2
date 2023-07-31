import React from 'react';
import "./style/summary.css";

const OrderSummary = ({ cartItems, totalPrice, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {cartItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '80px' }} />
                </td>
                <td>{item.name}</td>
                <td>Ksh{item.price}</td>
                <td>
                  <button className="remove-button" onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>Total:</td>
              <td>Ksh{total}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <div>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;