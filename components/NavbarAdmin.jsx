import React, { useState } from 'react';
import { HiSearch, HiBell, HiMoon, HiSun } from 'react-icons/hi';

const Navbar = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    // Kode untuk mengubah tema mode malam di aplikasi Anda
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    // Kode untuk mengubah panel notifikasi
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="font-bold p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4 mt-3">
        <div className="text-black text-2xl">Dashboard</div>

        <div className={`relative ${isSearchOpen ? 'w-40' : 'w-10'}`}>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Cari Proposal"
              className="px-5 py-2 rounded-lg bg-gray-40 shadow-lg focus:outline-offset-1 focus:bg-gray font-normal"
            />
          )}
          
        </div>


      </div>
      <div className="flex items-center space-x-4">
      <button onClick={toggleSearch} className="text-black relative">
        <HiSearch className="text-2xl" />
      </button>

        <button onClick={toggleNotification} className="text-black relative">
          <HiBell className="text-2xl" />
          {isNotificationOpen && (
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3"></div>
          )}
        </button>
        <button onClick={toggleNightMode} className="text-black">
          {isNightMode ? <HiSun className="text-2xl" /> : <HiMoon className="text-2xl" />}
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          <div className="text-black">Admin</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
