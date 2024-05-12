import React from 'react';

const LivePreview2 = ({ formData }) => {
  return (
    <div className="border rounded p-4 mb-4 bg-white">
      {/* <h2 className="text-lg font-medium mb-2 ">Live Preview</h2> */}
      <div className="mb-2">
        <h4 className="text-sm font-medium mb-1"></h4>
        <p className='text-center font-bold text-2xl'>{formData.judulProposal}</p>
      </div>
      {formData.forms && formData.forms.length > 0 ? (
        formData.forms.map((form, formIndex) => (
          <div key={formIndex} className="mb-4">
            <h3 className="text-md font-semibold mb-1"></h3>
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1"></h4>
              <p className='font-bold mt-10'>{form.judul}</p>
            </div>
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1"></h4>
              <p>{form.latarbelakang}</p>
            </div>
            {form.images && Array.isArray(form.images) && form.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <h4 className="text-sm font-medium"></h4>
                <img src={image.url} alt="Uploaded" className="rounded-md mx-auto mb-2 mt-10" style={{ maxWidth: '200px' }} />
                <p>{image.description}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className='text-center mt-10'>Live Preview</p>
      )}
    </div>
  );
};

export default LivePreview2;
