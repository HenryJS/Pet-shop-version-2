// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsPage from "./pages/product.page";
import OrderSummary from "./components/products/OrderSummary";
import { CartProvider } from './components/products/cartcontext'; 

function App() {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProductsPage />}
          />
          <Route
            path="/order-summary"
            element={<OrderSummary />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
