import React from 'react';

const StartButton = () => {
  return (
    <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-6 rounded-full flex items-center hover:from-teal-400 hover:to-blue-500">
      <div className="bg-white text-blue-500 rounded-full p-2 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      Start
    </button>
  );
};

export default StartButton;
