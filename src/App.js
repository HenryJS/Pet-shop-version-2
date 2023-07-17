import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Homepage from './pages/home.page';
import Product from './pages/product.page';
import Details from './pages/petdetails.page';
import Checkoutpage from './pages/checkout.page';



function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/products' element={<Product />} />
        <Route path='/details' element={<Details/>} />
        <Route path='/checkout' element={<Checkoutpage/>} />
      </Routes>
    </Router> 
  )
}

export default App;
  