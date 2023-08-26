import { useState, useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []); // Add an empty dependency array to run the effect only once

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
        {user && ( // Display cart info only for logged-in users
          <Link to="/order-summary">
            <ShoppingCartIcon /> {cartItems.length} items (Ksh{totalPrice})
          </Link>
        )}
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
      </div>

      <div className="menu-icon-container">
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
      </div>

     
    </nav>
  );
};

export default Navbar;
