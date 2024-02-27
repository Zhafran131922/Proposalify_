import React, { useState } from "react";
import { motion } from "framer-motion";
import AuthButton from "./AuthButton";

const Register = () => {
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ulangiPassword, setUlangiPassword] = useState("");

  const handleRegister = () => {
    // Implement registration logic using Firebase auth.createUserWithEmailAndPassword
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md"
    >
      <h1 className="text-4xl font-semibold mb-6 text-center">Selamat Datang di
        Proposalify</h1>
        <p className="text-center font-medium mb-3 text-sm">Sudah Punya Akun? Login</p>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="numberPhone" className="block text-sm font-medium text-gray-600">No. HP</label>
          <input
          id="numberPhone"
          type="number"
          placeholder="08575272912"
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="ulangiPassword" className="block text-sm font-medium text-gray-700">
            Ulangi Password
          </label>
          <input
            id="ulangiPassword"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setUlangiPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full mb-10"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Daftar
        </button>
      </form>
      <div className="mt-4">
      <AuthButton />
      </div>

    </motion.div>
  );
};

export default Register;
