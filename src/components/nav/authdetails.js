import React from 'react';


const AuthDetails = ({ user, username }) => {
  return (
    <div>
    {user ? (
      <p>{`Signed In as ${username || user.email}`}</p>
    ) : (
      <p></p>
    )}
  </div>
);
};
export default AuthDetails;