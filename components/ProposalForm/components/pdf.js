// Import semua yang diperlukan
import React from 'react';

// Definisikan komponen PDF
const PDF = ({ formData }) => {
  // Handler untuk mengunduh data formulir sebagai PDF
  const downloadPDF = () => {
    // Logika untuk mengunduh formulir sebagai PDF
    // Contoh:
    console.log('Mengunduh formulir sebagai PDF:', formData);
  };

  // Return tampilan untuk tombol unduh PDF
  return (
    <div>
      <button onClick={downloadPDF}>Unduh PDF</button>
    </div>
  );
};

// Export komponen PDF
export default PDF;
