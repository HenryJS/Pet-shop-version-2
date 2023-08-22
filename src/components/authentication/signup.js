import React, { useState, useEffect  } from 'react';
import { Pets, Favorite, EmojiNature } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase'
import './style/signup.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem('signupSuccess');
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      console.log('User signed up:', userCredential.user);
      localStorage.setItem('signupSuccess', 'true');
      setErrorMessage(''); 
    } catch (error) {
      console.error('Sign Up Error:', error);
      setErrorMessage(error.message);
      localStorage.removeItem('signupSuccess');
    }
  };
  


  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\+2547\d{0,8}$/.test(inputPhoneNumber) || inputPhoneNumber === '+2547') {
      setPhoneNumber(inputPhoneNumber);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid phone number format');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number (e.g. +254712345678)"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        {localStorage.getItem('signupSuccess') === 'true' && (
          <p className="success-message">New user added successfully!</p>
        )}
        {localStorage.getItem('loginSuccess') === 'true' && (
          <p className="success-message">Logged in successfully!</p>
        )}

      </form>
      <div className="bottom-icons">
        <Pets className="icon" />
        <Favorite className="icon" />
        <EmojiNature className="icon" />
      </div>
    </div>
  );
};

export default SignUp;
