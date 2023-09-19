import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import OrderSummary from "./components/products/OrderSummary";
import { CartProvider } from './components/products/cartcontext'; 
import Homepage from './pages/home.page';
import Testimonial from './components/testimonial/testimonial';
import Login from './pages/login.page';
import SignUp from './pages/signup.page'
import Add from './components/admin/add';
import AdminProducts from './components/admin/allProducts';
import AdminDashboard from './components/admin/dashboard';
import AllProducts from './components/products/allProduct';

function App() {
  const [setUser] = useState(null); // Initialize user state

  return (
      <CartProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/add" element={<Add />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<AllProducts />} />
          </Routes>
        </Router>
      </CartProvider>
  );
}

export default App;
