import React from 'react';

const LivePreview = ({ proposalData, uploadedImages }) => {
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
              className="max-w-200 max-h-200 object-contain mx-auto"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />
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
