import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext'; // Sesuaikan jalur impor
import UserProfileMenu from './UserProfileMenu'; // Sesuaikan jalur impor
import Logo from '../images/logo.png'; // Sesuaikan jalur impor
import Image from 'next/image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout } = useAuth(); // Mengakses informasi tentang status login pengguna
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login pengguna

  useEffect(() => {
    setIsLoggedIn(user !== null); // Perbarui status login pengguna setelah komponen dimuat
  }, [user]); // Gunakan user sebagai dependency agar useEffect dipanggil setiap kali nilai user berubah

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="relative flex items-center justify-between bg-white p-4">
      <div className="flex items-center font-roboto">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="mr-2 ml-20" style={{ height: '30px', width: 'auto' }} />
        </Link>
      </div>

      <div className="lg:hidden">
        <button onClick={toggleNav} className="text-black focus:outline-none">
          {isNavOpen ? (
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          )}
        </button>
      </div>

      <ul className={`lg:flex items-center space-x-4 text-black ml-auto ${isNavOpen ? 'block' : 'hidden'} lg:block`}>
        <motion.li className="font-bold p-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1, cursor: 'pointer' }} whileTap={{ scale: 0.9 }}>
          About
        </motion.li>
        <motion.li className="font-bold p-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1, cursor: 'pointer' }} whileTap={{ scale: 0.9 }}>
          Contact Us
        </motion.li>
        {!isLoggedIn && ( // Menampilkan tombol login dan sign up hanya jika pengguna belum login
          <>
            <motion.li initial={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} whileTap={{ scale: 0.9 }} className="hover:text-white transition duration-300 ease-in-out rounded p-2 border border-gray-200 bg-blue-500 flex justify-center items-center w-full lg:w-auto max-w-xs">
              <Link href="/login" className="text-white text-center w-full">Login</Link>
            </motion.li>
            <motion.li initial={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} whileTap={{ scale: 0.9 }} className="hover:text-white transition duration-300 ease-in-out rounded p-2 border border-gray-200 bg-blue-500 flex justify-center items-center w-full lg:w-auto max-w-xs">
              <Link href="/signup" className="text-white text-center w-full">Sign Up</Link>
            </motion.li>
          </>
        )}
        {isLoggedIn && ( // Menampilkan menu pengguna jika pengguna berhasil login
          <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ backgroundColor: '#1A91F0', transition: { duration: 0.1 } }} whileTap={{ scale: 0.9 }} className="ml-auto hover:text-white transition duration-300 ease-in-out rounded" style={{ cursor: 'pointer', display: 'flex' }}>
            <div className="relative">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Profile" width={40} height={40} className="rounded-full" />
              ) : (
                <InsertEmoticonIcon fontSize="large" />
              )}
              <UserProfileMenu logout={logout} />
            </div>
          </motion.li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
