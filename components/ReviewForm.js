import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [background, setBackground] = useState('');
  const [conclusion, setConclusion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ background, conclusion });
    setBackground('');
    setConclusion('');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="background" className="block text-gray-700 font-bold mb-2">Latar Belakang:</label>
          <textarea id="background" value={background} onChange={(e) => setBackground(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="conclusion" className="block text-gray-700 font-bold mb-2">Kesimpulan:</label>
          <textarea id="conclusion" value={conclusion} onChange={(e) => setConclusion(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4" required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm; // Pastikan ini diekspor dengan benar sebagai default
