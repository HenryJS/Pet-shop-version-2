import React, { useEffect, useState } from 'react';
import { ordersCollection, fetchProducts } from '../../firebase';
import { getDocs } from 'firebase/firestore';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from Firestore
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(ordersCollection);
        let ordersData = [];
        snapshot.docs.forEach((doc) => {
          ordersData.push({ ...doc.data(), id: doc.id });
        });

        // Fetch products to map order items to product names
        const products = await fetchProducts();

        // Map product IDs to product names in order items
        ordersData = ordersData.map((order) => ({
          ...order,
          orderItems: order.orderItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              ...item,
              productName: product ? product.ProductName : 'Product Not Found',
            };
          }),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.userId}</td>
              <td>{order.orderId}</td>
              <td>{order.orderDate.toDate().toLocaleString()}</td>
              <td>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.productId}>
                      {item.productName} (Quantity: {item.quantity})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
