import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import ForgotPasswordPopup from "./ForgotPassword"; // Importing the ForgotPasswordPopup
import "./LoginPopup.css";

const firebaseConfig = {
  apiKey: "AIzaSyByO2LXArpKjg6NG5HyJRJVrdNRh0G_vsw",
  authDomain: "planify-a83a9.firebaseapp.com",
  projectId: "planify-a83a9",
  storageBucket: "planify-a83a9.firebasestorage.app",
  messagingSenderId: "957538892334",
  appId: "1:957538892334:web:4afae113103bb9d68abdbf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State for showing forgot password popup

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Login Success:", user);
      alert(`Welcome, ${user.displayName}!`);
      setIsOpen(false); // Close the popup
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle regular login logic here (e.g., with Firebase)
    console.log("Logging in with:", email, password, rememberMe);
    setIsOpen(false); // Close the popup after login
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true); // Show the forgot password popup
  };

  return (
    <div className="login-container">
      <button className="open-popup-btn" onClick={togglePopup}>
        Login
      </button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <div className="checkbox-forgot-container">
                <div className="remember-me-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span>Remember me</span>
                </div>
                <button
                  type="button"
                  className="forgot-password-btn"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <div className="google-btn">
              <button className="submit-btn" onClick={handleGoogleLogin}>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      )}
      {showForgotPassword && <ForgotPasswordPopup closePopup={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default LoginPopup;
