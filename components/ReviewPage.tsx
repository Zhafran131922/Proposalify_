import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import ReviewForm from './ReviewForm';
import UploadPDF from './UploadPDF';

const ReviewPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [review, setReview] = useState(null);

  const handlePdfUpload = (e) => { // Pastikan menerima objek event
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmitReview = (data) => {
    setReview(data);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
        <div className="w-1/2">
          <ReviewForm onSubmit={handleSubmitReview} />
        </div>
      </div>
      <div>
        <UploadPDF onFileSelect={handlePdfUpload} /> {/* Menampilkan tombol upload PDF */}
      </div>
    </div>
  );
};

export default ReviewPage; // Pastikan ini diekspor dengan benar sebagai default
