import React, { useState } from 'react';
import {useAuth} from '../components/firebase/AuthContext'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { signUp } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 

  const handleSignup = (e) => {
    e.preventDefault();
    signUp(email, password)
    // Perform signup logic here (e.g., API request)
    console.log('User signed Up');

    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form inputs
    setUsername('');
    setEmail('');
    setPassword('');
    window.location.href = "http://localhost:3000/"
   
  };

  return (
    <div className="popup-banner">
      <div className="container">
        <h1>Time Bandit Sign Up </h1>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

