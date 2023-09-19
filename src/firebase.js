// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadString } from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore"; // Import getFirestore


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyPnoM34AjNJIoNJLkbMFW8Py3SgyGsms",
  authDomain: "onlinepetsop.firebaseapp.com",
  projectId: "onlinepetsop",
  storageBucket: "onlinepetsop.appspot.com",
  messagingSenderId: "164758330854",
  appId: "1:164758330854:web:28d80d678ba37f30110a27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app); 
 

 // collection
 const colRef = collection( db, 'Products')
 
// Collection reference for Products
const productsCollection = collection(db, "Products");

// Collection reference for Orders
const ordersCollection = collection(db, "Orders");

// Function to add an order to the Orders collection
const addOrder = async (userId, orderId, orderDate, orderItems) => {
  try {
    const orderRef = doc(ordersCollection, orderId);
    await setDoc(orderRef, {
      userId,
      orderId,
      orderDate,
      orderItems,
    });
    console.log("Order added successfully");
  } catch (error) {
    console.error("Error adding order:", error);
  }
};


// Function to fetch all products from the Products collection
const fetchProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    let Products = [];
    snapshot.docs.forEach((doc) => {
      Products.push({ ...doc.data(), id: doc.id });
    });
    return Products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Export the functions and references
export {
  auth,
  db,
  storage,
  colRef,
  productsCollection,
  ordersCollection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  ref,
  uploadString,
  setDoc,
  addOrder,
  fetchProducts,
};