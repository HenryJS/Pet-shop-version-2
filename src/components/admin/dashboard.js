import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await db.collection('orders').orderBy('timestamp', 'desc').get();
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders from Firestore: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order Dashboard</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            {/* Add additional order details here */}
            <p>Total Price: Ksh {order.totalPrice}</p>
            <p>Order Timestamp: {order.timestamp.toDate().toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
