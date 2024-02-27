import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const AuthButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black w-full border border-gray-600 rounded-full py-2 px-4"
      style={{ borderRadius: "5px" }}
    >
      <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Login with Google
    </button>
  );
};

export default AuthButton;
