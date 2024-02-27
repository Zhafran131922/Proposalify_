// UploadPDF.js
import React, { useState } from 'react';

const UploadPDF = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(e); // Perubahan di sini: Meneruskan event ke fungsi onFileSelect
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {selectedFile && <p>File yang dipilih: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadPDF;
