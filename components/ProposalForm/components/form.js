// Import semua yang diperlukan
import { useState } from 'react';

// Definisikan komponen Form
const Form = () => {
  // State untuk menyimpan nilai input dari pengguna
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // Tambahan sesuai dengan kebutuhan formulir
    // ...
  });

  // Handler untuk mengupdate nilai input saat pengguna mengetik
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk mengirim data formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman data formulir ke backend atau lakukan operasi lainnya
    // Contoh:
    console.log('Data yang dikirim:', formData);
  };

  // Return tampilan formulir
  return (
    <form onSubmit={handleSubmit}>
      {/* Isi formulir sesuai dengan kebutuhan */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Judul Proposal"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Deskripsi Proposal"
      ></textarea>
      {/* Tambahkan input lainnya sesuai kebutuhan */}
      <button type="submit">Kirim</button>
    </form>
  );
};

// Export komponen Form
export default Form;
