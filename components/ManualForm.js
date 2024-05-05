import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ProposalForm = () => {
  const [forms, setForms] = useState([]);
  const [images, setImages] = useState([]);

  const addForm = () => {
    setForms([...forms, { judul: '', latarbelakang: '' }]);
    setImages([...images, []]); // Menambahkan array kosong untuk setiap formulir baru
  };

  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    const updatedImages = images.filter((_, i) => i !== index);
    setForms(updatedForms);
    setImages(updatedImages);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
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
        }
      };
    }
  };

  const removeImage = (formIndex, imageIndex) => {
    const updatedImages = [...images];
    updatedImages[formIndex].splice(imageIndex, 1); // Menghapus URL gambar dari array yang sesuai
    setImages(updatedImages);
  };

  const handleDescriptionChange = (formIndex, imageIndex, event) => {
    const { value } = event.target;
    const updatedImages = [...images];
    updatedImages[formIndex][imageIndex].description = value;
    setImages(updatedImages);
  };

  const addImageAndField = (doc, image, startY, description) => {
    const img = new Image();
    img.src = image;
    
    const imgWidth = img.width;
    const imgHeight = img.height;
    const aspectRatio = imgWidth / imgHeight;
    
    const desiredWidth = 80; // Width of the image
    const desiredHeight = desiredWidth / aspectRatio;
    
    const maxWidth = 190; // Max width for the image
    const maxHeight = 150; // Max height for the image
    let scale = 1;
    
    if (imgWidth > maxWidth || imgHeight > maxHeight) {
      scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
    }
    
    const finalWidth = desiredWidth * scale;
    const finalHeight = desiredHeight * scale;
    
    const x = 10; // X coordinate of the image
    let yPosAfterImage = startY + finalHeight + 10;
    
    if (yPosAfterImage > doc.internal.pageSize.height) {
      doc.addPage();
      startY = 20; // Reset startY for the new page
      yPosAfterImage = startY + finalHeight + 10;
    }
    
    doc.addImage(image, 'PNG', x, startY, finalWidth, finalHeight);
    
    // Add description below the image
    const commentY = startY + finalHeight + 10;
    const splitDescription = doc.splitTextToSize(description, 190);
    doc.text(splitDescription, 10, commentY);
    
    startY = yPosAfterImage + splitDescription.length * 7 + 10;
    
    return startY;
  };
  
  const downloadPDF = () => {
    const doc = new jsPDF();
    let startY = 10;
    
    doc.setFont('helvetica', 'bold');
    const textWidth = doc.getTextDimensions(judulProposal).w;
    const xCoordinate = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.text(judulProposal, xCoordinate, startY);
    startY += 10;
    
    doc.setFont('helvetica', 'normal');
    
    forms.forEach((form, formIndex) => {
      const splitFormJudul = doc.splitTextToSize(` ${form.judul}`, 190);
      doc.text(splitFormJudul, 10, startY);
      startY += splitFormJudul.length * 7 + 10;
    
      const splitFormIsi = doc.splitTextToSize(` ${form.latarbelakang}`, 190);
      doc.text(splitFormIsi, 10, startY);
      startY += splitFormIsi.length * 7 + 10;
    
      const hasUploadedImages = images[formIndex].some(image => !!image.url);
    
      if (hasUploadedImages) {
        images[formIndex].forEach((image, imageIndex) => {
          if (image.url) {
            startY = addImageAndField(doc, image.url, startY, `Deskripsi Gambar ${imageIndex + 1}: ${image.description}`);
    
            // Check if content exceeds page height and add new page if necessary
            if (startY > doc.internal.pageSize.height) {
              doc.addPage();
              startY = 20; // Reset startY for the new page
            }
          }
        });
      }
    
      startY += 10;
    });
    
    if (doc.internal.pages.length > 1) {
      doc.save('proposal.pdf');
    } else {
      alert('Anda perlu mengunggah setidaknya satu gambar sebelum dapat mengunduh PDF.');
    }
  };
  
  

  const [judulProposal, setJudulProposal] = useState('');


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
        onChange={(e) => setJudulProposal(e.target.value)}
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
              name="judul"
              value={form.judul || ''}
              onChange={(e) => handleChange(formIndex, e)}
              placeholder="Judul Bagian Proposal"
              className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            />
            <textarea
              name="latarbelakang"
              value={form.latarbelakang || ''}
              onChange={(e) => handleChange(formIndex, e)}
              placeholder="Isi"
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

    </div>
  );
};

export default ProposalForm;
