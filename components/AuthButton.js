import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase";

const AuthButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="bg-blue-500 text-white p-2 rounded">
      Login with Google
    </button>
  );
};

export default AuthButton;
