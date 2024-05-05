// Import semua yang diperlukan
import React, { useState } from 'react';

// Definisikan komponen Image
const Image = () => {
  // State untuk menyimpan daftar gambar
  const [images, setImages] = useState([]);

  // Handler untuk menambahkan gambar
  const handleAddImage = (e) => {
    // Mendapatkan file gambar dari input
    const newImage = e.target.files[0];

    // Memastikan file yang dipilih adalah gambar
    if (newImage && newImage.type.startsWith('image/')) {
      // Mengubah file gambar menjadi URL data
      const imageUrl = URL.createObjectURL(newImage);

      // Menambahkan gambar ke daftar gambar
      setImages([...images, imageUrl]);
    }
  };

  // Handler untuk menghapus gambar
  const handleDeleteImage = (index) => {
    // Membuat salinan daftar gambar
    const updatedImages = [...images];
    
    // Menghapus gambar dengan indeks yang diberikan
    updatedImages.splice(index, 1);
    
    // Mengupdate daftar gambar
    setImages(updatedImages);
  };

  // Return tampilan fitur tambah dan hapus gambar
  return (
    <div>
      {/* Input untuk menambahkan gambar */}
      <input type="file" onChange={handleAddImage} accept="image/*" />
      
      {/* Menampilkan daftar gambar */}
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Image ${index + 1}`} />
          {/* Tombol untuk menghapus gambar */}
          <button onClick={() => handleDeleteImage(index)}>Hapus</button>
        </div>
      ))}
    </div>
  );
};

// Export komponen Image
export default Image;
