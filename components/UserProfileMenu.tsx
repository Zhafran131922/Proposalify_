// components/UserProfileMenu.tsx

import React from 'react';
import { useAuth } from "@/app/AuthContext";

const UserProfileMenu = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="p-4 rounded-md shadow-md bg-white w-48 h-auto">
      <p className="text-gray-700 mb-2 border-b pb-2">{user.displayName}</p>
      <p className="cursor-pointer text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out mb-2">
        History
      </p>
      <p className="cursor-pointer text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out mb-2">
        Tracking
      </p>
      <button
        className="cursor-pointer text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfileMenu;
