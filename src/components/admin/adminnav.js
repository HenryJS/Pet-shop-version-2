import React from 'react';
import { Link } from 'react-router-dom';
import './styles/nav.css';


function Nav() {
  return (
    <>
     <nav className="navbar">
      <ul className='nav-link'>
        <li>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin" className="nav-item">All Products</Link>
        </li>
        <li>
          <Link to="/add" className="nav-item">Add Products</Link>
        </li>
        <li>
          <button className="logout-button">
            <Link to="/" className="nav-item">Logout</Link>
          </button>
        </li>
      </ul>
    </nav>
    </>
   
  );
}

export default Nav;
