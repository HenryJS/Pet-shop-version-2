import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const LoginButton = () => {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleLogout = () => {
    auth.signOut();
  };

  if (user) {
    return (
      <div className="user-welcome">
        Welcome, {user.displayName}
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <Link to="/login">Login</Link>
    );
  }
};

export default LoginButton;
