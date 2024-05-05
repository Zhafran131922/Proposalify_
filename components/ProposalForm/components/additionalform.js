// Import semua yang diperlukan
import React, { useState } from 'react';

// Definisikan komponen AdditionalForm
const AdditionalForm = () => {
  // State untuk menyimpan data tambahan
  const [additionalData, setAdditionalData] = useState({
    // Definisikan data tambahan sesuai kebutuhan
    // Contoh:
    address: '',
    phone: '',
    // ...
  });

  // Handler untuk mengupdate data tambahan saat pengguna mengetik
  const handleChange = (e) => {
    setAdditionalData({
      ...additionalData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk mengirim data tambahan
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman data tambahan ke backend atau lakukan operasi lainnya
    // Contoh:
    console.log('Data tambahan yang dikirim:', additionalData);
  };

  // Return tampilan formulir tambahan
  return (
    <form onSubmit={handleSubmit}>
      {/* Isi formulir tambahan sesuai dengan kebutuhan */}
      <input
        type="text"
        name="address"
        value={additionalData.address}
        onChange={handleChange}
        placeholder="Alamat"
      />
      <input
        type="text"
        name="phone"
        value={additionalData.phone}
        onChange={handleChange}
        placeholder="Nomor Telepon"
      />
      {/* Tambahkan input tambahan lainnya sesuai kebutuhan */}
      <button type="submit">Kirim</button>
    </form>
  );
};

// Export komponen AdditionalForm
export default AdditionalForm;
