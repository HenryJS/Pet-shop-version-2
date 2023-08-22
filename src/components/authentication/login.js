import React, { useState, useEffect} from 'react';
import { auth } from '../../firebase'; // Import the auth object from your firebase.js
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  useEffect(() => {
    localStorage.removeItem('loginSuccess');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message
    
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        localStorage.setItem('loginSuccess', 'true');
      })
      .catch((error) => {
        console.error('Login Error:', error);
        setErrorMessage(error.message);
        localStorage.removeItem('loginSuccess');
      });
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input className='input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='password-input'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <VisibilityOff
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Visibility
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        {localStorage.getItem('signupSuccess') === 'true' && (
          <p className="success-message">New user added successfully!</p>
        )}
        {localStorage.getItem('loginSuccess') === 'true' && (
          <p className="success-message">Logged in successfully!</p>
        )}

      </form>
    </div>
  );
};

export default Login;
