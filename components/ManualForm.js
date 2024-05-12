import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import LivePreview2 from './LivePreview2';

const ProposalForm = ({ setProposalData, setPreviewData }) => {
  const [forms, setForms] = useState([]);
  const [images, setImages] = useState([]);
  const [judulProposal, setJudulProposal] = useState('');
  const [latarBelakang, setLatarBelakang] = useState('');

  useEffect(() => {
    setPreviewData({ judulProposal: judulProposal });
  }, [judulProposal, setPreviewData]);

  useEffect(() => {
    // Memperbarui live preview setiap kali ada perubahan pada data gambar
    setPreviewData((prevData) => ({
      ...prevData,
      forms: forms.map((form, formIndex) => ({
        ...form,
        images: images[formIndex],
      })),
    }));
  }, [images, forms, setPreviewData]);

  const updatePreviewData = () => {
    const formData = {
      judulProposal: judulProposal,
      latarBelakang: latarBelakang,
      forms: forms.map((form, formIndex) => ({
        ...form,
        images: images[formIndex], // Memasukkan array gambar ke setiap objek formulir
      })),
    };
    setPreviewData(formData);
  };
  
  

  const addForm = () => {
    setForms([...forms, { judul: '', latarbelakang: '' }]);
    setImages([...images, []]);
    updatePreviewData(); // Memanggil fungsi updatePreviewData setiap kali menambah formulir
  };

  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    const updatedImages = images.filter((_, i) => i !== index);
    setForms(updatedForms);
    setImages(updatedImages);
    updatePreviewData(); // Memanggil fungsi updatePreviewData setiap kali menghapus formulir
  };
  

  const handleChange = (formIndex, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[formIndex][name] = value;
    setForms(updatedForms);
    updatePreviewData(); // Memanggil fungsi updatePreviewData setiap kali ada perubahan pada formulir
  };
  
  const handleFormChange = (formIndex, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[formIndex][name] = value;
    setForms(updatedForms);
  };

  const handleKeyDown = (formIndex, e) => {
    // Jika tombol yang ditekan adalah tombol enter
    if (e.key === 'Enter') {
      e.preventDefault(); // Mencegah default action tombol enter (pindah ke baris baru)
      handleFormChange(formIndex, { target: { name: 'latarbelakang', value: e.target.value + '\n' } });
    }
  };
  

  const handleImageUpload = (formIndex, event) => {
    const files = event.target.files;
    const updatedImages = [...images];
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        const imageUrl = reader.result;
        uploadedImages.push({ url: imageUrl, description: '' });
        if (uploadedImages.length === files.length) {
          updatedImages[formIndex] = [...updatedImages[formIndex], ...uploadedImages];
          setImages(updatedImages);
          updatePreviewData();
        }
      };
    }
  };

  const removeImage = (formIndex, imageIndex) => {
    const updatedImages = [...images];
    updatedImages[formIndex].splice(imageIndex, 1); // Menghapus URL gambar dari array yang sesuai
    setImages(updatedImages);
    updatePreviewData();
  };


  const handleJudulChange = (e) => {
    const value = e.target.value;
    setJudulProposal(value);
    updatePreviewData(); // Memanggil fungsi updatePreviewData setiap kali ada perubahan pada judul
  };
  
  const handleDescriptionChange = (formIndex, imageIndex, event) => {
    const { value } = event.target;
    const updatedImages = [...images];
    updatedImages[formIndex][imageIndex].description = value;
    setImages(updatedImages);
    updatePreviewData();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let startY = 10; // Inisialisasi posisi vertikal untuk formulir pertama
  
    // Set font style to bold for the title
    doc.setFont('helvetica', 'bold');
  
    // Menempatkan teks judul di tengah halaman dan membuatnya bold
    const textWidth = doc.getTextDimensions(judulProposal).w;
    const xCoordinate = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.text(judulProposal, xCoordinate, startY); // Menempatkan teks di tengah
    startY += 20; // Menambahkan jarak vertikal setelah judul
  
    // Set font style back to normal for the rest of the text
    doc.setFont('helvetica', 'normal');
  
    // Loop melalui semua formulir
    forms.forEach((form, formIndex) => {
      // Tambahkan judul formulir ke PDF    
      doc.setFont('helvetica', 'bold');
      doc.text(`${form.judul}`, 10, startY);
      doc.setFont('helvetica', 'normal');
      startY += 10; // Menambahkan jarak vertikal setelah judul formulir
  
      // Tambahkan isi formulir ke PDF
      const isiLines = doc.splitTextToSize(form.latarbelakang, 170); // Split teks menjadi beberapa baris jika diperlukan
      isiLines.forEach(line => {
        if (startY + 10 > doc.internal.pageSize.height) { // Periksa apakah perlu menambah halaman baru
          doc.addPage();
          startY = 10;
        }
        doc.text(20, startY, line, {align: 'justify'}); // Tambahkan teks
        startY += 7; // Menambahkan jarak vertikal antar baris
      });
  
      // Cek apakah formulir memiliki setidaknya satu gambar yang diunggah
      const hasUploadedImages = images[formIndex].some(image => !!image.url);
  
      if (hasUploadedImages) {
        // Loop melalui semua gambar untuk formulir tertentu
        images[formIndex].forEach((image, imageIndex) => {
          const imageHeight = 80; // Tinggi gambar
  
          // Tambahkan gambar ke PDF jika URL gambar tersedia
          if (image.url) {
            if (startY + imageHeight + 20 > doc.internal.pageSize.height) { // Periksa apakah perlu menambah halaman baru
              doc.addPage();
              startY = 10;
            }
          
            // Dapatkan lebar halaman PDF
            const pageWidth = doc.internal.pageSize.getWidth();
          
            // Dapatkan informasi tentang ukuran asli gambar
            const img = new Image();
            img.src = image.url;
            const originalWidth = img.width;
            const originalHeight = img.height;
          
            // Tentukan lebar yang diinginkan pada PDF
            const desiredWidth = 80;
          
            // Hitung skala berdasarkan perbandingan lebar yang diinginkan dengan lebar asli gambar
            const scaleFactor = desiredWidth / originalWidth;
          
            // Hitung tinggi gambar berdasarkan skala
            const scaledWidth = desiredWidth;
            const scaledHeight = originalHeight * scaleFactor;
          
            // Hitung posisi horizontal agar gambar berada di tengah halaman
            const startX = (pageWidth - scaledWidth) / 2;
          
            // Tambahkan gambar dengan ukuran yang disesuaikan dan berada di tengah halaman secara horizontal
            doc.addImage(image.url, 'PNG', startX, startY, scaledWidth, scaledHeight);
          
            // Menambahkan jarak vertikal antara gambar dan deskripsi
            startY += scaledHeight + 10; // Jarak vertikal antara gambar dan deskripsi
          
            // Tambahkan deskripsi gambar
            const descriptionLines = doc.splitTextToSize(`${image.description}`, 170); // Split teks deskripsi
            descriptionLines.forEach(line => {
              if (startY + 10 > doc.internal.pageSize.height) { // Periksa apakah perlu menambah halaman baru
                doc.addPage();
                startY = 10;
              }
              doc.text(20, startY, line); // Tambahkan teks deskripsi
              startY += 7; // Menambahkan jarak vertikal antar baris
            });
            startY += 10 + scaledHeight;
          }
        });
      }
  
      // Tambahkan jarak vertikal antara formulir-formulir
      startY += 1; // Jarak vertikal antara formulir-formulir
    });
  
    // Jika dokumen memiliki lebih dari satu halaman, simpan PDF
    if (doc.internal.pages.length > 1) {
      doc.save('proposal.pdf');
    } else {
      // Jika tidak, tampilkan pesan kesalahan
      alert('Anda perlu mengunggah setidaknya satu gambar sebelum dapat mengunduh PDF.');
    }
  };

  const handleSubmit = () => {
    console.log(forms);
    console.log(images);
  };

  return (
    <div className=" mt-8">
      <h1 className="text-2xl font-semibold mb-4">Proposal Form</h1>
      {/* Input untuk judul proposal */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-medium mb-2">Judul Proposal</h2>
        <input
          type="text"
          name="judulProposal"
          value={judulProposal}
          onChange={handleJudulChange}
          placeholder="Judul Proposal"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      
      {forms.map((form, formIndex) => (
        <div key={formIndex} className="mb-6 p-4 border rounded">
          <h2 className="text-lg font-medium mb-2">Formulir {formIndex + 1}</h2>
          <div className="mb-4">
          <input
              type="text"
              value={form.judul || ''}
              onChange={(e) => handleChange(formIndex, e)}
              placeholder="Judul Bagian Proposal"
              name="judul"
              className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            />
            <textarea
              value={form.latarbelakang || ''}
              onChange={(e) => handleFormChange(formIndex, e)}
              onKeyDown={(e) => handleKeyDown(formIndex, e)} // Menangkap peristiwa tombol key down
              placeholder="Isi"
              name="latarbelakang"
              className="border border-gray-300 rounded-md p-2 w-full"
              rows="3"
            />

            <input
              type="file"
              onChange={(e) => handleImageUpload(formIndex, e)}
              className="border border-gray-300 rounded-md p-2 mr-2"
              multiple // Memungkinkan pengguna untuk memilih lebih dari satu file
            />
            {images[formIndex] && images[formIndex].map((image, imageIndex) => (
              <div key={imageIndex} className="mt-2">
                <div className="flex items-center">
                  <img
                    src={image.url}
                    alt="Uploaded"
                    className="rounded-md mr-2"
                    style={{ maxWidth: '100px' }}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={image.description}
                    onChange={(e) => handleDescriptionChange(formIndex, imageIndex, e)}
                    placeholder="Isi"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <button
                    onClick={() => removeImage(formIndex, imageIndex)}
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:bg-red-600 float-right"
                  >
                    Hapus Gambar
                  </button>

                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => removeForm(formIndex)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Hapus Formulir
          </button>
        </div>
      ))}
      <button
        onClick={addForm}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
      >
        Tambah Formulir
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Kirim
      </button>
      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
      >
        Unduh PDF
      </button>

      {/* Menampilkan live preview dengan data yang dimasukkan */}
      
    </div>
  );
};

export default ProposalForm;
