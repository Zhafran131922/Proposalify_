import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Change import to useNavigate
import AuthButton from "../components/AuthButton";
import { useRouter } from 'next/router';


const Login = () => {
  const router = useRouter(); // Change from useHistory to useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic using Firebase auth.signInWithEmailAndPassword

    // Assuming login is successful, navigate to the proposal page
    setTimeout(() => {
      navigate("/proposal"); // Use navigate instead of history.push
    }, 1000);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
      <AuthButton />
      </div>

    </motion.div>
  );
};

export default Login;
