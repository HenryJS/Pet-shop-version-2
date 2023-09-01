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

//get collection data
getDocs(colRef)
.then((snapshot) => {
  let Products = []
  snapshot.docs.forEach((doc) => {
    Products.push({ ...doc.data(), id:doc.id})
  })
  console.log(Products)
})
.catch(err =>{
  console.log(err.message)
})



export { auth, db, storage, colRef, addDoc, deleteDoc, doc, ref, uploadString, setDoc };