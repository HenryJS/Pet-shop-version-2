import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Details from './pages/petdetails.page';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Details />} />
      </Routes>
    </Router> 
  )
}

export default App;
  