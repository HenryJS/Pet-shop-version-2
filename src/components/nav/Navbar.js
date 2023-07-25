import React, { useState } from 'react';
import Logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/Navbar.css';

const Navbar = ({ cartItems, totalPrice }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt=''/>
      </div>
      <div className={`navbar-links-container ${isMobileMenuOpen ? "mobile-active" : ""}`}>
        <a href="/">Home</a>
        <a href="/">Available Breeds</a>
        <a href="/">Testimonials</a>
        <Link to="/order-summary"> 
          <ShoppingCartIcon /> {cartItems.length} items (Ksh{totalPrice})
        </Link>
        <button className="primary-button">John Henry</button>
      </div>
      {/* Show the menu icon only on smaller screens */}
      <div className="menu-icon-container">
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
