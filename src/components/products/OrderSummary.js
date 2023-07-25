import React from 'react';

const OrderSummary = ({ cartItems }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{item.name}</td>
              <td>1</td> {/* For simplicity, assuming quantity is always 1 */}
              <td>Ksh{item.price}</td>
              <td>Ksh{item.price}</td> {/* For simplicity, assuming subtotal is same as price */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;

