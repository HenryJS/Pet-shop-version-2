import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './styles/AdminDashboard.css'; // Import your CSS file for styling
import PetsIcon from '@mui/icons-material/Pets';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from Firestore (replace 'yourFirestoreCollection' with the actual collection name)
    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders'); // Replace with your collection name

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
              <TableCell>Order Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>Ksh {order.totalPrice}</TableCell>
                <TableCell className="order-items">
                  {order.orderItems.map((item, index) => (
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
                  ))}
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
