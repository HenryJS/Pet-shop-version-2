import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import './styles/AdminDashboard.css';
import PetsIcon from '@mui/icons-material/Pets';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      try {
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleClearOrder = async (orderId) => {
    // Delete the order with the specified ID from Firestore
    const db = getFirestore();
    const orderRef = doc(db, 'yourFirestoreCollection', orderId); // Replace with your collection name
    try {
      await deleteDoc(orderRef);
      // Remove the deleted order from the state
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error clearing order:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <TableContainer>
        <Table className="order-table" aria-label="Order table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>User Address</TableCell> {/* Add this column */}
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>Ksh {order.totalPrice}</TableCell>
                <TableCell>{order.userAddress}</TableCell> {/* Display user address */}
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  {order.timestamp && order.timestamp.toDate().toLocaleString()} {/* Convert timestamp to string */}
                </TableCell>
                <TableCell className="order-items">
                  {Array.isArray(order.orderItems) ? (
                    order.orderItems.map((item, index) => (
                      <div key={index}>
                        {item.name.includes('Pet') && (
                          <PetsIcon className="icon pet-icon" />
                        )}
                        {item.name.includes('Food') && (
                          <FastfoodIcon className="icon food-icon" />
                        )}
                        {item.name.includes('Mall') && (
                          <LocalMallIcon className="icon mall-icon" />
                        )}
                        {item.name} x{item.quantity}
                      </div>
                    ))
                  ) : (
                    <div>No order items found</div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClearOrder(order.id)}
                  >
                    Clear
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
