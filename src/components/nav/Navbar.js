import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import AuthDetails from './authdetails';
import { useCart } from '../products/cartcontext';
import Logo from '../assets/Logo.jpg';
import './styles/Navbar.css';

const Navbar = () => {
  const { cartItems, totalPrice = 0 } = useCart();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
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
        setShowLoginModal(false);
        setLoginErrorMessage('');
      })
      .catch((error) => {
        console.log(error);
        setLoginErrorMessage('Invalid email or password');
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser(userCredential.user);
        setUsername(username);
        setShowLoginModal(false);
      })
      .catch((error) => {
        console.error('Firebase Sign Up Error:', error);
      });
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
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
          <button className="primary-button" onClick={toggleLoginModal}>
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

      {showLoginModal && (
        <div className="login-modal">
          <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={signIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              {loginErrorMessage && <p className="error-message">{loginErrorMessage}</p>}
            </form>
            <p>
              Don't have an account?{' '}
              <span onClick={() => toggleLoginModal()}>Sign Up</span>
            </p>
            {showLoginModal && (
              <div className="auth-form">
                <h2>Create an Account</h2>
                <form onSubmit={signUp}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Sign Up</button>
                </form>
                <p>
                  Already have an account?{' '}
                  <span onClick={() => toggleLoginModal()}>Login</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
