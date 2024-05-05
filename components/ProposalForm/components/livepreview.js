// Import semua yang diperlukan
import React, { useState, useEffect } from 'react';

// Definisikan komponen LivePreview
const LivePreview = ({ additionalFormData }) => {
  // State untuk menyimpan live preview
  const [previewData, setPreviewData] = useState('');

  // Handler untuk memperbarui live preview
  const updateLivePreview = () => {
    // Logika untuk memperbarui live preview sesuai dengan data tambahan
    // Contoh:
    const preview = `Preview: ${additionalFormData}`;
    setPreviewData(preview);
  };

  // Effect hook untuk memanggil fungsi updateLivePreview setiap kali terjadi perubahan pada additionalFormData
  useEffect(() => {
    updateLivePreview();
  }, [additionalFormData]);

  // Return tampilan live preview
  return (
    <div>
      <h2>Live Preview</h2>
      <p>{previewData}</p>
    </div>
  );
};

// Export komponen LivePreview
export default LivePreview;
