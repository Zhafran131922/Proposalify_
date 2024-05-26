import React from 'react';
import { jsPDF } from 'jspdf';

const LivePreview2 = ({ formData }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    formData.forms.forEach((form, formIndex) => {
      doc.text(form.judul, 10, (formIndex + 1) * 10);
      const latarbelakangLines = doc.splitTextToSize(form.latarbelakang || '', 180);
      let y = (formIndex + 1) * 20 + 10;
      latarbelakangLines.forEach((line) => {
        const formattedLine = parseHTML(line);
        doc.setFont(formattedLine.font, formattedLine.style);
        doc.text(formattedLine.text, 10, y);
        y += doc.getTextDimensions(formattedLine.text).h; // Menambahkan tinggi teks
      });
      if (Array.isArray(form.images)) {
        form.images.forEach((image, imageIndex) => {
          doc.addImage(image.url, 'JPEG', 10, y + (imageIndex + 1) * 40, 50, 50);
          doc.text(image.description, 10, y + (imageIndex + 1) * 40 + 55);
        });
      }
    });
  
    doc.save('livePreview.pdf');
  };
  
  const parseHTML = (html) => {
    let result = { text: '', font: 'helvetica', style: 'normal' };
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nodes = doc.body.childNodes;
  
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result.text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        switch (tagName) {
          case 'strong':
            // Jika teks berada di dalam tag <strong>, atur style menjadi cetakan tebal (bold)
            result.style = 'bold';
            // Rekursif untuk memproses lebih dalam jika ada lebih banyak tag dalam tag
            result.text += parseHTML(node.innerHTML).text;
            break;
          case 'em':
            // Jika teks berada di dalam tag <em>, atur style menjadi miring (italic)
            result.style = 'italic';
            // Rekursif untuk memproses lebih dalam jika ada lebih banyak tag dalam tag
            result.text += parseHTML(node.innerHTML).text;
            break;
          default:
            // Jika ada tag lain, terus proses rekursif untuk menelusuri lebih dalam
            result.text += parseHTML(node.innerHTML).text;
            break;
        }
      }
    });
  
    return result;
  };
  

  
  return (
    <div className="border rounded p-4 mb-4 bg-white">
      <div className="mb-2">
        <p className="text-center font-bold text-2xl">{formData.judulProposal}</p>
      </div>
      {Array.isArray(formData.forms) && formData.forms.length > 0 ? (
        formData.forms.map((form, formIndex) => (
          <div key={formIndex} className="mb-4">
            <div className="mb-2">
              <p className="font-bold mt-10">{form.judul}</p>
            </div>
            <div className="mb-2 text-justify">
              <div dangerouslySetInnerHTML={{ __html: form.latarbelakang }} />
            </div>
            {Array.isArray(form.images) && form.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <img src={image.url} alt={image.description} className="rounded-md mx-auto mb-2 mt-10" style={{ maxWidth: '200px' }} />
                <p>{image.description}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center mt-10">Live Preview</p>
      )}
      <button onClick={handleDownloadPDF} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
        Download PDF
      </button>
    </div>
  );
};

export default LivePreview2;
