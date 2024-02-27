import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import { useRouter } from 'next/router';


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // AuthButton component
  const handleLogin = () => {
    setTimeout(() => {
      router.push("/proposal");
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mb-5 text-sm">Hai, Selamat Datang di Proposalify</p>
      <div className="" >
        
      <div>
        <AuthButton/>
      </div>
      </div>
      <div className="border-t border-gray-300 text-center my-6">
        <span className="bg-white px-2 text-gray-600 font-semibold">Or</span>
      </div>
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
      <div className="mt-4">
      
      </div>
    </motion.div>
  );
};

export default Login;
