import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "./SignUpPopup.css";

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

const SignUpPopup = ({ closePopup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Sign up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await user.updateProfile({ displayName: name });

      setMessage("Account created successfully!");
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Failed to create an account.");
    }
  };

  // Sign up with Google
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign Up Success:", user);
      setMessage("Account created successfully with Google!");
    } catch (error) {
      console.error("Google Sign Up Error:", error);
      setMessage("Failed to create an account with Google.");
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-popup">
        <button className="close-btn" onClick={closePopup}>
          &times;
        </button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Enter your name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Enter your email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </label>
          <label>
            Enter your password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>
          <button type="submit" className="submit-btn">Create Account</button>
        </form>
        <div className="google-signup-btn-container">
          <button className="google-signup-btn" onClick={handleGoogleSignUp}>
            Register with Google
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPopup;
