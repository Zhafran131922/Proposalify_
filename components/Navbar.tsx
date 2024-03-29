import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignupHovered, setIsSignupHovered] = useState(false);

  return (
<nav className="relative flex items-center justify-between bg-white p-4">
  {/* Logo */}
  <div className="flex items-center">
  <Link href="/">
      <img src="/logo.png" alt="Logo" className="h-20 mr-2 ml-20" />
  </Link>
  <span className="text-black font-semibold text-lg">Proposalify</span>
</div>
  {/* Kotak untuk About */}
  {isAboutHovered && (
    <motion.div
      className="absolute left-0 w-full bg-gray-200 h-10 flex items-center justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ top: '7rem' }} // Menyesuaikan posisi kotak di bawah logo
    >
      <p className="text-black">Teks untuk About</p>
    </motion.div>
  )}
  {/* Kotak untuk Contact Us */}
  {isContactHovered && (
    <motion.div
      className="absolute left-0 w-full bg-gray-200 h-10 flex items-center justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ top: '7rem' }} // Menyesuaikan posisi kotak di bawah logo
    >
      <p className="text-black">Teks untuk Contact Us</p>
    </motion.div>
  )}
  {/* Menu */}
  <ul className="flex items-center justify-center space-x-4 text-black">
    {/* Menu items */}
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, fontWeight: "bold", cursor: 'pointer' }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsAboutHovered(true)}
      onMouseLeave={() => setIsAboutHovered(false)}
    >
      About
    </motion.li>
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, fontWeight: "bold", cursor: 'pointer' }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsContactHovered(true)}
      onMouseLeave={() => setIsContactHovered(false)}
    >
      Contact Us
    </motion.li>
  </ul>
  <ul className="flex items-center space-x-4 text-black">
    <motion.li
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ 
    backgroundColor: "#1A91F0", 
    transition: { duration: 0.1 } // Mengurangi durasi transisi menjadi 0.1 detik
  }}
  whileTap={{ scale: 0.9 }}
  onMouseEnter={() => setIsLoginHovered(true)}
  onMouseLeave={() => setIsLoginHovered(false)}
  className={`hover:text-white transition duration-300 ease-in-out rounded ${
    isLoginHovered ? 'bg-blue-500' : ''
  }`}
  style={{ padding: isLoginHovered ? '10px 20px' : '6px 16px', cursor: 'pointer' }} // Menyesuaikan padding saat di-hover
>
  <Link href="/login">Login</Link>
</motion.li>

<motion.li
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ 
    backgroundColor: "#1A91F0", 
    transition: { duration: 0.1 } // Mengurangi durasi transisi menjadi 0.1 detik
  }}
  whileTap={{ scale: 0.9 }}
  onMouseEnter={() => setIsSignupHovered(true)}
  onMouseLeave={() => setIsSignupHovered(false)}
  className={`hover:text-white transition duration-300 ease-in-out rounded ${
    isSignupHovered ? 'bg-blue-500' : ''
  }`}
  style={{ padding: isSignupHovered ? '10px 20px' : '6px 16px', cursor: 'pointer' }} // Menyesuaikan padding saat di-hover
>
  <Link href="/signup">Sign Up</Link>
</motion.li>
  </ul>
</nav>


  );
};

export default Navbar;
