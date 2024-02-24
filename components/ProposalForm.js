import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

const ProposalForm = ({ proposalData, onChange, onSubmit }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleToggleInfo = (e) => {
    e.preventDefault();
    setShowInfo((prevShowInfo) => !prevShowInfo);
  };
  
  const handleCloseInfo = () => {
    setShowInfo(false);
  };
  
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = () => {
        newImages.push(reader.result);
        
        if (newImages.length === files.length) {
          setUploadedImages(prevImages => [...prevImages, ...newImages]);
          onChange('uploadedImages', [...uploadedImages, ...newImages]);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  
  const handleImageDelete = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    onChange('uploadedImages', updatedImages); // Update proposalData
  };
  
  

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const title = proposalData.title;
    const background = proposalData.background;
    const conclusion = proposalData.conclusion;
  
    let yPos = 20;
  
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleWidth = doc.getTextDimensions(title).w;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(titleX, yPos, title);
    yPos += 20;
  
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(20, yPos, 'Latar Belakang');
    yPos += 10;
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const backgroundLines = doc.splitTextToSize(background, 170);
    backgroundLines.forEach((line) => {
      if (yPos + 7 > doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(20, yPos, line, { align: 'justify' }); // Setting text alignment to justify
      yPos += 7;
    });
  
    // Create promises for loading images
    const imagePromises = uploadedImages.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = image;
      });
    });
  
    // Wait for all images to load
    Promise.all(imagePromises).then((images) => {
      images.forEach((img, index) => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const aspectRatio = imgWidth / imgHeight;
  
        // Adjusting image size based on aspect ratio
        const desiredWidth = 500;
        const desiredHeight = desiredWidth / aspectRatio;
  
        // Scaling down the image if necessary
        const maxWidth = 500; // Max width for the image
        const maxHeight = desiredHeight; // Max height for the image
        let scale = 1;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
          scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        }
  
        const x = (doc.internal.pageSize.width - (desiredWidth * scale)) / 2;
        let yPosAfterImage = yPos + (desiredHeight * scale) + 10;
  
        if (yPosAfterImage > doc.internal.pageSize.height) {
          doc.addPage();
          yPos = 20;
          yPosAfterImage = yPos + (desiredHeight * scale) + 10;
        }
  
        doc.addImage(img, 'JPEG', x, yPos, desiredWidth * scale, desiredHeight * scale);
        yPos = yPosAfterImage; // Update yPos to the position after adding the image
      });
  
      yPos += 10; // Adjust yPos before adding Conclusion
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(20, yPos, 'Conclusion:');
      yPos += 10;
  
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const conclusionLines = doc.splitTextToSize(conclusion, 170);
      conclusionLines.forEach((line) => {
        if (yPos + 7 > doc.internal.pageSize.height - 20) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(20, yPos, line, { align: 'justify' }); // Setting text alignment to justify
        yPos += 7;
      });
  
      doc.save('proposal.pdf');
    }).catch(error => {
      console.error('Error loading images:', error);
    });
  };
  
  
  return (
    <form className="border p-4" onSubmit={onSubmit}>
      <h2 className="text-lg font-bold mb-4">Proposal Form</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={proposalData.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
    <label htmlFor="background" className="flex items-center mb-2 font-semibold">
      Latar Belakang:
      <button
        onClick={handleToggleInfo}
        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded focus:outline-none"
      >
        Info
      </button>
    </label>
    {showInfo && (
      <motion.div 
        initial={{ opacity: 0, y: -20 }} // animasi awal: opasitas 0 dan translasi -20px ke atas
        animate={{ opacity: 1, y: 0 }} // animasi saat muncul: opasitas 1 dan translasi 0
        transition={{ duration: 0.3 }} // durasi animasi: 0.3 detik
        className="bg-gray-100 border border-gray-300 p-2 rounded"
      >
        <p>Ini adalah informasi tentang latar belakang.</p>
        <button onClick={handleCloseInfo} className="text-blue-500 underline focus:outline-none mt-2">Close</button>
      </motion.div>
    )}
      <textarea
        id="background"
        name="background"
        value={proposalData.background}
        onChange={handleChange}
        className="border p-2 w-full h-32 justify-textarea"
        style={{ textAlign: 'justify' }} // Menetapkan teks align ke justify
      />

      </div>
      <div className="mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="imageUpload">Unggah Gambar :</label>
        <input type="file" id="imageUpload" className='mt-2' name="imageUpload" onChange={handleImageUpload} multiple />
        {uploadedImages.map((image, index) => (
          <div key={image} className="mb-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <img
              src={image}
              alt={`Uploaded Image ${index}`}
              className="max-w-full h-auto"
              style={{ maxWidth: '200px', maxHeight: '200px' }} // Atur maksimum lebar dan tinggi gambar di sini
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="mt-2 px-2 py-1 bg-red-500 text-white rounded focus:outline-none"
            >
              Hapus Gambar
            </button>
          </div>
        ))}


      </div>
      <div className="mb-4">
        <label htmlFor="conclusion" className="block mb-2 font-semibold">
          Conclusion:
        </label>
        <textarea
          id="conclusion"
          name="conclusion"
          value={proposalData.conclusion}
          onChange={handleChange}
          className="border p-2 w-full h-32"
        />
      </div>
      <motion.button
        type="button"
        onClick={handleGeneratePDF}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Generate PDF
      </motion.button>
      <motion.button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded ml-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Submit Proposal
      </motion.button>

    </form>
  );
};

export default ProposalForm;
