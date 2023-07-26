import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/home.page';
//import ProductsPage from './pages/Product'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/*<Route path="/products" element={<ProductsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
