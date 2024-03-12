import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router"; // Import useHistory
import AuthButton from "./AuthButton";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Import firestore module


const Register = () => {
  const [email, setEmail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [numberPhoneError, setNumberPhoneError] = useState("");
  const router = useRouter(); 

  const handleRegister = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(numberPhone.length !== 11) {
      setNumberPhoneError("No. Hp yang anda masukan kurang dari 11 digit")
    } else {
        setNumberPhoneError("");
        history.push("/proposal");
    }
    
    // Implement registration logic using Firebase auth.createUserWithEmailAndPassword
  };

  

// File Register.tsx

// Frontend code (misalnya, dalam React component)
const handleGoogleSignIn = async () => {
  try {
    // Lakukan sign-in dengan Google di frontend
    const result = await firebase.auth().signInWithPopup(googleProvider);
    const googleIdToken = await result.user?.getIdToken();

    // Kirim token Google ID ke backend untuk registrasi
    const response = await fetch('http://localhost:3000/api/auth/registerWithGoogle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: googleIdToken,
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
};


// Gunakan fungsi handleGoogleSignIn di dalam form atau sebagai opsi registrasi


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
          onChange={(e) => {
            setNumberPhone(e.target.value);
            setNumberPhoneError("");
          }}
          className="mt-1 p-2 border rounded-md w-full"
          />
          {numberPhoneError && <h6 className="text-gray-500 text-sm">{numberPhoneError}</h6>}
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
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
              Ulangi Password
            </label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="******"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full mb-10"
            />
          </div>

          <button
              onClick={handleGoogleSignIn}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 w-full mt-4"
            >
              Daftar dengan Google
            </button>
            <button
    type="submit"
    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 w-full mt-4"
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