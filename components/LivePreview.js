import React from 'react';

const LivePreview = ({ proposalData, uploadedImagesBackground, uploadedImagesDeskripsiUsaha, uploadedImagesPenutup, uploadedImagesLampiran, additionalData }) => {
  return (
    <div id="live-preview-container" className="border p-4 bg-white radius">
      <div className="mb-4 text-center">
        <span className="font-bold text-2xl">{proposalData.title}</span>
      </div>
      <div className="mb-4 mt-20">
        <strong>Latar Belakang</strong>
        {proposalData.background && proposalData.background.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div>
        {uploadedImagesBackground?.map((imageUrl, index) => (
          <div key={index} className="mb-4">
            <img
              src={imageUrl}
              alt={`Uploaded Image ${index}`}
              className="max-w-200 max-h-200 object-contain mx-auto mb-20"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />

            {/* Teks "New Field" yang berkaitan dengan gambar */}
            {Array.isArray(additionalData) && additionalData.length > index && (
              <div className='mb-20' style={{ textAlign: 'justify' }}>
                {additionalData[index]?.newField}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4 mt-20">
        <strong>Deskripsi Usaha</strong>
        {proposalData.deskripsiusaha && proposalData.deskripsiusaha.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div>
        {uploadedImagesDeskripsiUsaha?.map((imageUrl, index) => (
          <div key={index} className="mb-4">
            <img
              src={imageUrl}
              alt={`Uploaded Image ${index}`}
              className="max-w-200 max-h-200 object-contain mx-auto mb-20"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />

            {/* Teks "New Field" yang berkaitan dengan gambar */}
            {Array.isArray(additionalData) && additionalData.length > index && (
              <div className='mb-20' style={{ textAlign: 'justify' }}>
                {additionalData[index]?.newField}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4 mt-20">
        <strong>Penutup</strong>
        {proposalData.penutup && proposalData.penutup.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div>
        {uploadedImagesPenutup?.map((imageUrl, index) => (
          <div key={index} className="mb-4">
            <img
              src={imageUrl}
              alt={`Uploaded Image ${index}`}
              className="max-w-200 max-h-200 object-contain mx-auto mb-20"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />

            {/* Teks "New Field" yang berkaitan dengan gambar */}
            {Array.isArray(additionalData) && additionalData.length > index && (
              <div className='mb-20' style={{ textAlign: 'justify' }}>
                {additionalData[index]?.newField}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4 mt-20">
        <strong>Lampiran</strong>
        {proposalData.lampiran && proposalData.lampiran.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div>
        {uploadedImagesLampiran?.map((imageUrl, index) => (
          <div key={index} className="mb-4">
            <img
              src={imageUrl}
              alt={`Uploaded Image ${index}`}
              className="max-w-200 max-h-200 object-contain mx-auto mb-20"
              style={{ maxWidth: '800px', maxHeight: '200px' }}
            />

            {/* Teks "New Field" yang berkaitan dengan gambar */}
            {Array.isArray(additionalData) && additionalData.length > index && (
              <div className='mb-20' style={{ textAlign: 'justify' }}>
                {additionalData[index]?.newField}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePreview;
