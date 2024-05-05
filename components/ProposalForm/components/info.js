// Import semua yang diperlukan
import React, { useState } from 'react';

// Definisikan komponen Info
const Info = () => {
  // State untuk menyimpan informasi tambahan
  const [info, setInfo] = useState('');

  // Handler untuk mengupdate informasi tambahan
  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  // Return tampilan informasi tambahan
  return (
    <div>
      <h2>Info Tambahan</h2>
      <textarea
        value={info}
        onChange={handleInfoChange}
        placeholder="Masukkan informasi tambahan..."
      ></textarea>
      <p>Informasi Tambahan: {info}</p>
    </div>
  );
};

// Export komponen Info
export default Info;
