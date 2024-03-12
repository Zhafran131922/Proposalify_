// pages/SignUpPage.tsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignUp from '../components/Register';
import { app } from '../src/app/firebase'; // Import instance Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Gunakan fungsionalitas autentikasi Firebase untuk mendaftarkan pengguna
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Pengguna berhasil didaftarkan.');
      // Mungkin tambahkan penanganan redirect atau pesan sukses di sini
    } catch (error) {
      console.error('Terjadi kesalahan saat pendaftaran:', error.message);
      // Mungkin tambahkan penanganan error atau tampilkan pesan kesalahan kepada pengguna
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SignUp
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
      />
    </div>
  );
};

export default SignUpPage;
