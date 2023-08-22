import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Link as ScrollLink } from 'react-scroll';
import { useCart } from '../products/cartcontext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/Logo.jpg';
import { auth } from '../../firebase';
import './styles/Navbar.css';

const Navbar = () => {
  const { cartItems, totalPrice = 0 } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleLogout = () => {
    auth.signOut();
  };

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

      {user ? (
        <div className="user-welcome">
          Welcome, {user.displayName}
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login" className="primary-button">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
