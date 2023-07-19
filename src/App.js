import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Product from "./pages/product.page";


function App(){
  return(
    <Router>
      <Routes>
      <Route path='/products' element={<Product />} />
      </Routes>
    </Router> 
  )
}

export default App;
  