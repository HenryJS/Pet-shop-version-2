import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import { useCart } from "../products/cartcontext"
import Logo from "../assets/Logo.jpg"
import './styles/Navbar.css'

const Navbar = () => {
  const { cartItems, totalPrice = 0 } = useCart();
  const location = useLocation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const getButtonLabel = () => {
    if (location.pathname === '/') {
      return 'Login/Signup';
    } else if (location.pathname === '/products') {
      return 'Hi there :)';
    }

    return 'Hi There!';
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
        <button className="primary-button" onClick={() => setActiveForm(activeForm === 'login' ? null : 'login')}>
          {getButtonLabel()}
        </button>
      </div>
      <div className="menu-icon-container">
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
      </div>
      <div className={`auth-form ${activeForm ? 'active' : ''}`}>
        {activeForm === 'login' && (
          <div>
            <h2>Login</h2>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={() => setActiveForm('signup')}>Sign Up</span></p>
          </div>
        )}
        {activeForm === 'signup' && (
          <div>
            <h2>Sign Up</h2>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <span onClick={() => setActiveForm('login')}>Login</span></p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
