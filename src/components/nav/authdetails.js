import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../firebase';

const AuthDetails = ({ user }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <p>{`Signed In as ${user.displayName || user.email}`}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AuthDetails;
