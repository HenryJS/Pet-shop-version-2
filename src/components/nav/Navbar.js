import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useCart } from '../products/cartcontext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/Logo.jpg';
import { auth } from '../../firebase'; // Import your firebase auth object
import './styles/Navbar.css';


const Navbar = () => {
  const { cartItems, totalPrice = 0 } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to track authenticated user
  
  auth.onAuthStateChanged((user) => {
    setUser(user); // Update user state when authentication state changes
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt='' />
      </div>
      <div className={`navbar-links-container ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Available Breeds</Link>
        <ScrollLink to="testimonials" smooth={true} duration={500}>
          Testimonials
        </ScrollLink>
        <Link to="/order-summary">
          <ShoppingCartIcon /> {cartItems.length} items (Ksh{totalPrice})
        </Link>
      </div>
      <div className="menu-icon-container">
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
      </div>
     
       {/* Conditionally render Login button or user's name */}
          {user ? (
            <span>Welcome, {user.displayName}</span>
          ) : (
            <Link to="/login">Login</Link>
          )}

     
    </nav>
  );
};

export default Navbar;
