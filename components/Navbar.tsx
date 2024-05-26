import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth';
import { useAuth } from "@/app/AuthContext";
import UserProfileMenu from './UserProfileMenu';
import Logo from '../images/logo.png'
import Image from 'next/image';
 

const Navbar = () => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignupHovered, setIsSignupHovered] = useState(false);
  const { user, signOutUser, userProfileIcon } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleLogin = () => {
      console.log(`Pengguna ${user.displayName} telah login.`);
    }; 
  
    const handleLogout = () => {
      console.log('Tidak ada pengguna yang login.');

    };

    if (user) {
      handleLogin();
    } else {
      handleLogout();
    }
  }, [user]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const isUserLoggedIn = user !== null;
  

  return (
<nav className="relative flex items-center justify-between bg-white p-4">
  {/* Logo */}
  <div className="flex items-center">
  <Link href="/">
      <Image src={Logo} alt="Logo" className="h-20 w-16 mr-2 ml-20" />
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
        {isUserLoggedIn ? (
          // Jika pengguna telah login, tampilkan ikon profil
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "#1A91F0", transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleProfileMenu} // Menghapus onMouseEnter dan onMouseLeave
        className="ml-auto hover:text-white transition duration-300 ease-in-out rounded"
        style={{ cursor: 'pointer' }}
      >
        <div className="relative">
          <div
            className="cursor-pointer"
            // onClick={toggleProfileMenu} // Sudah ada onClick di atas, tidak perlu di sini
          >
            {/* Tampilkan ikon profil */}
            {userProfileIcon || <FontAwesomeIcon icon={faUser} className="text-black text-xl" />}
          </div>
          {/* Tampilkan UserProfileMenu jika isProfileMenuOpen bernilai true */}
          {isProfileMenuOpen && user && (
            <motion.div
              className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <UserProfileMenu />
            </motion.div>
          )}
        </div>
      </motion.li>

        ) : (
          // Jika pengguna belum login, tidak perlu menampilkan ikon profil
          <>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: "#1A91F0", transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
              className={`hover:text-white transition duration-300 ease-in-out rounded ${
                isLoginHovered ? 'bg-blue-500' : ''
              }`}
              style={{ padding: isLoginHovered ? '10px 20px' : '6px 16px', cursor: 'pointer' }}
            >
              <Link href="/login">Login</Link>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: "#1A91F0", transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsSignupHovered(true)}
              onMouseLeave={() => setIsSignupHovered(false)}
              className={`hover:text-white transition duration-300 ease-in-out rounded ${
                isSignupHovered ? 'bg-blue-500' : ''
              }`}
              style={{ padding: isSignupHovered ? '10px 20px' : '6px 16px', cursor: 'pointer' }}
            >
              <Link href="/signup">Sign Up</Link>
            </motion.li>
          </>
        )}
      </ul>
      {/* Profile Icon */}


</nav>


  );
};

export default Navbar;
