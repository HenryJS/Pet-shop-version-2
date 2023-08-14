import React, { useState } from 'react';
import Logo from "../assets/Logo.jpg";
import MenuIcon from '@mui/icons-material/Menu';
import './styles/Navbar.css';

const Navbar = () => {
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
        <button className="primary-button">Login/sign-up</button>
      </div>
      <div className="menu-icon-container">
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
