import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsPage from "./pages/product.page";
import OrderSummary from "./components/products/OrderSummary";

function App() {
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state as an empty array
  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice state with an initial value

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          }
        />
        <Route path="/order-summary" element={<OrderSummary cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
