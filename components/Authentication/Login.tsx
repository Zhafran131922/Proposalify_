import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Axios from "axios"; // Import Axios
import { useRouter } from 'next/router';
import { useAuth } from '@/app/AuthContext';
import AuthButton from "./AuthButton";
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post("http://localhost:5000/api/auth/login/user", {
        email,
        password
      });
      const token = response.data.token;
  
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          localStorage.setItem('userId', userId);
  
          const userResponse = await Axios.get(`http://localhost:5000/api/users/users/${userId}`);
          const user = userResponse.data;
          setRole(user.role);
  
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      } else {
        console.log('No token found');
      }
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
      setErrorMessage('Email atau kata sandi salah.');
    }
  };
  
  // useEffect to handle navigation based on role
  useEffect(() => {
    if (role) {
      if (role === 'admin') {
        router.push('/useradmin');
      } else if (role === 'dosen') {
        router.push('/pagedosen');
      } else if (role === 'user') {
        router.push('/userdash');
      } else {
        console.log('Unknown role:', role);
      }
    }
  }, [role]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mb-5 text-sm">Hai, Selamat Datang di Proposalify</p>
      <div className="">
        <div>
          <AuthButton/>
        </div>
      </div>
      <div className="border-t border-gray-300 text-center my-6">
        <span className="bg-white px-2 text-gray-600 font-semibold">Or</span>
      </div>
      {errorMessage && ( // Display error message if exists
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 w-full">
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
        <div className="flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="ml-2">Ingat Saya</label>
          </div>
          <a href="#lupapassword" className="text-blue-500">Lupa Password?</a>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Belum punya akun? <a href="#daftar">Daftar</a></p>
      </div>
      <div className="mt-4"></div>
    </motion.div>
  );
};

export default Login;