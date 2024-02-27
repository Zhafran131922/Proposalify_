import React, { useState } from 'react';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div className="overflow-y-auto border-r border-gray-300">
      {pdfUrl ? (
        <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
      ) : (
        <p className="text-center">Belum ada PDF yang dipilih</p>
      )}
    </div>
  );
};

export default PDFViewer;
