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
  <ul className="flex items-center space-x-4 text-black mr-20 ml-auto">
    {/* Menu items */}
    <motion.li
      whileHover={{ scale: 1.1, fontWeight: "bold" }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsAboutHovered(true)}
      onMouseLeave={() => setIsAboutHovered(false)}
    >
      About
    </motion.li>
    <motion.li
      whileHover={{ scale: 1.1, fontWeight: "bold" }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsContactHovered(true)}
      onMouseLeave={() => setIsContactHovered(false)}
    >
      Contact Us
    </motion.li>
    <motion.li
      whileHover={{ backgroundColor: "blue", scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsLoginHovered(true)}
      onMouseLeave={() => setIsLoginHovered(false)}
      className="hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded w-100 h-100"
    >
      Login
    </motion.li>
    {/* Tombol Sign Up */}
    <motion.li
      whileHover={{ backgroundColor: "blue", scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsSignupHovered(true)}
      onMouseLeave={() => setIsSignupHovered(false)}
      className="hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out rounded"
    >
      Sign Up
    </motion.li>
    {/* ... */}
  </ul>
</nav>


  );
};

export default Navbar;
