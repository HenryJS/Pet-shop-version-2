import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Homepage from './pages/home.page';
import About from './pages/about.page';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/" element={<About />} />
      </Routes>
    </Router> 
  )
}

export default App;
  