import React from 'react';
import { useAuth } from '@/app/AuthContext'; // Sesuaikan jalur impor

const UserProfileMenu = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-white shadow-lg rounded p-4">
      <button onClick={logout} className="w-full text-left text-gray-700 hover:text-black">
        Logout
      </button>
    </div>
  );
};

export default UserProfileMenu;
