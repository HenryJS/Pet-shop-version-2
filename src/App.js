import React, { useState}from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsPage from "./pages/product.page";
import OrderSummary from "./components/products/OrderSummary";
import { CartProvider } from './components/products/cartcontext'; 
import Homepage from './pages/home.page';
import Testimonial from './components/testimonial/testimonial';
import Login from './pages/login.page';
import SignUp from './pages/signup.page'
import Navbar from './components/nav/Navbar';


function App() {
  const [user, setUser] = useState(null); // Initialize user state
  return (
    <CartProvider> 
      <Router>
      <Navbar user={user} setUser={setUser} />
        <Routes>
        <Route
            path="/"
            element={<Homepage />}
          />
            <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/products"
            element={<ProductsPage />}
          />
          <Route
            path="/order-summary"
            element={<OrderSummary />}
          />
           <Route
            path="/testimonials"
            element={<Testimonial />}
          />
           <Route
            path="/login"
            element={<Login />}
          />
           <Route
            path="/signup"
            element={<SignUp/>}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
