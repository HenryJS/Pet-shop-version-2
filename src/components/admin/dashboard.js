import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, increment, addDoc } from 'firebase/firestore';
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
import Nav from './adminnav';


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1); // Initialize the counter to 1

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

    // Fetch the order counter value from Firestore and set it in the state
    const fetchOrderCounter = async () => {
      const db = getFirestore();
      const counterDocRef = doc(db, 'counters', 'orderCounter'); // Replace with your document path
      try {
        const counterDocSnapshot = await getDocs(counterDocRef);
        if (counterDocSnapshot.exists()) {
          const counterValue = counterDocSnapshot.data().value;
          setOrderCounter(counterValue);
        }
      } catch (error) {
        console.error('Error fetching order counter:', error);
      }
    };

    fetchOrders();
    fetchOrderCounter();
  }, []);

  const handleClearOrder = async (orderId) => {
    // Delete the order with the specified ID from Firestore
    const db = getFirestore();
    const orderRef = doc(db, 'orders', orderId); // Replace with your collection name
    try {
      await deleteDoc(orderRef);
      // Remove the deleted order from the state
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error clearing order:', error);
    }
  };

  const handlePlaceOrder = async () => {
    // Create a new order document
    const db = getFirestore();
    const ordersCollectionRef = collection(db, 'orders');
    const newOrderData = {
      orderId: orderCounter, // Use the current counter value as the order ID
      // Add other order data (userName, userAddress, paymentMethod, orderItems, totalPrice, timestamp)
    };

    try {
      await addDoc(ordersCollectionRef, newOrderData);

      // Increment the order counter in Firestore by 1
      const countersCollection = doc(db, 'counters'); 
      await updateDoc(countersCollection, {
        value: increment(1), // Increment the value by 1
      });

      // Update the local order counter in the state
      setOrderCounter((prevCounter) => prevCounter + 1);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
    <Nav/>
      <div>
          <h1>Orders Placed </h1>
          <TableContainer>
            <Table className="order-table" aria-label="Order table">
              <TableHead>
                <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>User Address</TableCell> 
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
                <TableCell>{order.userAddress}</TableCell> 
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

    </>
  );
};

export default AdminDashboard;
