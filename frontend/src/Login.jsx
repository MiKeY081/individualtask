import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import './App.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = { email, password };
      console.log("Sending login request with data:", data);
  
      const res = await axios.post("/user/login", data);
      console.log("Received response:", res);
  
      if (res.data.success) {
        console.log("Login successful");
        navigate("/home");
      } else {
        console.log("Login failed. Response:", res.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 transition"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 transition"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          New to the page?{' '}
          <span onClick={(e) => navigate("/register")} className="text-blue-500 cursor-pointer">Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
