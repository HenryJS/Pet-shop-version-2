import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../products/cartcontext';
import Logo from '../assets/Logo.jpg';
import AuthDetails from './authdetails';
import './styles/Navbar.css';

const Navbar = () => {
  const { cartItems, totalPrice = 0 } = useCart();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(auth.currentUser);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const getButtonLabel = () => {
    if (user) {
      return user.displayName || user.email;
    }
    return 'Login/Signup';
  };

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (user) {
      handleSignOut();
    } else {
      setActiveForm(activeForm === 'login' ? null : 'login');
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        setUser(null);
      })
      .catch((error) => {
        console.error('Sign Out Error:', error);
      });
  };

  const getIntroText = () => {
    if (user) {
      return `Welcome, ${username || user.email}!`;
    }
    return null;
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser(userCredential.user);
        setActiveForm(null); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser(userCredential.user);
        setUsername(username);
        setActiveForm(null); 
      })
      .catch((error) => {
        console.error("Firebase Sign Up Error:", error);
      });
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
      {!user ? (
        <button className="primary-button" onClick={handleAuthAction}>
          Login/Signup
        </button>
      ) : null}
    </div>
    <div className="menu-icon-container">
      <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
    </div>
    
    <div className="auth-details">
  <AuthDetails user={user} username={username} /> 
      {user ? (
        <>
          <p>{getIntroText()}</p>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : null}
    </div>
      <div className={`auth-form ${activeForm ? 'active' : ''}`}>
        {activeForm === 'login' && (
          <div>
            <h2>Login</h2>
            <form onSubmit={signIn}>
              <input type="email" placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={() => setActiveForm('signup')}>Sign Up</span></p>
          </div>
        )}
        {activeForm === 'signup' && (
          <div>
            <h2>Create an Account </h2>
            <form onSubmit={signUp}>
              <input type="email" placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
               <input type="text" placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               />
              <input type="password" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               />
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