import React from 'react';

const LivePreview = ({ proposalData, uploadedImages, additionalData }) => {
  return (
    <div id="live-preview-container" className="border p-4 bg-white radius">
      <div className="mb-4 text-center">
        <span className="font-bold text-2xl">{proposalData.title}</span>
      </div>
      <div className="mb-4 mt-20">
        <strong>Latar Belakang</strong>
        {proposalData.background.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div>
      {uploadedImages?.map((imageUrl, index) => (
          <div key={index} className="mb-4">
            <img
              src={imageUrl}
              alt={`Uploaded Image ${index}`}
              className="max-w-200 max-h-200 object-contain mx-auto mb-20"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />

            {/* Teks "New Field" yang berkaitan dengan gambar */}
            {Array.isArray(additionalData) && additionalData.length > index && (
              <div className='mb-20'style={{ textAlign: 'justify' }}>
               {additionalData[index]?.newField}
              </div>
            )}
          </div>
        ))}


</div>

      <div>
        <strong>Conclusion:</strong> {proposalData.conclusion}
      </div>
    </div>
  );
};

export default LivePreview;
