import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputControl from "./inputcontrol/inputControl";
import { auth } from "../../firebase";
import Navbar from "../nav/Navbar";
import { getDocs, doc, db } from '../../firebase';
import "./style/login.css";

function Login() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    try {
      if (!values.email || !values.pass) {
        setErrorMsg("Fill all fields");
        return;
      }
      setErrorMsg("");
  
      setSubmitButtonDisabled(true);
  
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
  
      // Successfully logged in, enable the submit button
      setSubmitButtonDisabled(false);
  
      const user = userCredential.user;
  
      // Fetch the user's role from Firestore
      const userDoc = await getDocs(doc(db, "users", user.uid)); // Replace "users" with your Firestore collection name
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // Assuming "role" is the field for user roles
  
        if (userRole === 'admin') {
          // User is an admin, redirect to the admin dashboard
          navigate("/admin");
        } else {
          // User is not an admin, redirect to the regular user dashboard or homepage
          navigate("/");
        }
      }
    } catch (error) {
      // Handle login errors
      setSubmitButtonDisabled(false);
      setErrorMsg(error.message);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="innerBox">
          <h1 className="heading">Login</h1>
      <div className="innerBox"> 
          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <div className="password-input">
              <InputControl
                label="Password"
                type={passwordShown ? "text" : "password"}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
                placeholder="Enter Password"
              />
              <i onClick={togglePasswordVisibility}>
                <VisibilityIcon />
              </i>
           </div>
        </div>
          <div className="footer">
            <b className="error">{errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
