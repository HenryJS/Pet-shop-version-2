import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Checkoutpage from './pages/checkout.page';


function App(){
  return(
    <Router>
      <Routes>
      <Route path='/' element={<Checkoutpage/>} />
      </Routes>
    </Router> 
  )
}

export default App;
  