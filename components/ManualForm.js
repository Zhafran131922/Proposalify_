import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const ProposalForm = ({ setProposalData, setPreviewData }) => {
  const [ lihat, setLihat ] = useState('');

  useEffect(() => {
    console.log(lihat)
    
  },[lihat])
  
  const [forms, setForms] = useState([
    { judul: 'Latar Belakang', latarbelakang: '' },
    { judul: 'Deskripsi Usaha', latarbelakang: '' },
    { judul: 'Kesimpulan', latarbelakang: '' },
    { judul: 'Lampiran', latarbelakang: '' },
    { judul: 'Penutup', latarbelakang: '' },
  ]);
  const [images, setImages] = useState([]);
  const [judulProposal, setJudulProposal] = useState('');
  const [latarBelakang, setLatarBelakang] = useState('');
  const quillRefs = useRef(Array(forms.length).fill(null).map(() => React.createRef()));


  useEffect(() => {
    setPreviewData({ judulProposal });
  }, [judulProposal, setPreviewData]);

  useEffect(() => {
    quillRefs.current = quillRefs.current.slice(0, forms.length);
  }, [forms.length]);

  const updatePreviewData = () => {
    const formData = {
      judulProposal,
      latarBelakang,
      forms,
    };
    setPreviewData(formData);
  };

  const addForm = () => {
    setForms([...forms, { judul: '', latarbelakang: '' }]);
    quillRefs.current.push(React.createRef());
    updatePreviewData();
  };

  const removeForm = (index) => {
    if (window.confirm("Dengan hapus formulir, semua isi di dalamnya juga ikut terhapus")) {
      const updatedForms = forms.filter((_, i) => i !== index);
      setForms(updatedForms);
      quillRefs.current = quillRefs.current.filter((_, i) => i !== index);
      updatePreviewData();
    }
  };

  const handleFormChange = (formIndex, field, value) => {
    const updatedForms = forms.map((form, index) => {
      if (index === formIndex) {
        return { ...form, [field]: value };
      }
      return form;
    });
    setForms(updatedForms);
    updatePreviewData();
  };

  const handleJudulChange = (e) => {
    setJudulProposal(e.target.value);
    updatePreviewData();
  };


  const handleQuillChange = (formIndex, value) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].latarbelakang = value;
    setForms(updatedForms);
    updatePreviewData();
  };

  const moveFormUp = (index) => {
    if (index > 0) {
      setForms((prevForms) => {
        const newForms = [...prevForms];
        const temp = { ...newForms[index] }; // Salin nilai latarbelakang
        newForms[index] = { ...newForms[index - 1] }; // Salin formulir yang akan ditukar tempat
        newForms[index - 1] = temp; // Kembalikan nilai latarbelakang yang disalin
        return newForms;
      });
    }
  };
  
  const moveFormDown = (index) => {
    if (index < forms.length - 1) {
      setForms((prevForms) => {
        const newForms = [...prevForms];
        const temp = { ...newForms[index] }; // Salin nilai latarbelakang
        newForms[index] = { ...newForms[index + 1] }; // Salin formulir yang akan ditukar tempat
        newForms[index + 1] = temp; // Kembalikan nilai latarbelakang yang disalin
        return newForms;
      });
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    let yOffset = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const newPageTopMargin = 20;
    const maxLineWidth = pageWidth - 2 * margin;
  
    const justifyText = (doc, text, x, y, lineWidth, lineHeight) => {
      const lines = doc.splitTextToSize(text, lineWidth);
      lines.forEach((line, index) => {
        const words = line.split(' ');
        if (index !== lines.length - 1) {
          const gaps = words.length - 1;
          const totalTextWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
          const totalSpaceWidth = lineWidth - totalTextWidth;
          const spaceWidth = totalSpaceWidth / gaps;
  
          let cursorX = x;
          words.forEach((word, wordIndex) => {
            doc.text(word, cursorX, y + index * lineHeight);
            cursorX += doc.getTextWidth(word) + spaceWidth;
          });
        } else {
          doc.text(line, x, y + index * lineHeight);
        }
      });
      return lines.length * lineHeight;
    };
  
    const addImage = async (doc, img, y) => {
      const imageDataUrl = await toPng(img);
      const imageWidth = 50;
      const imageHeight = (img.height / img.width) * imageWidth;
      const x = (pageWidth - imageWidth) / 2;
      doc.addImage(imageDataUrl, 'PNG', x, y, imageWidth, imageHeight);
      return imageHeight + 10;
    };
  
    const checkIfNewPageNeeded = (contentHeight) => {
      if (yOffset + contentHeight > pageHeight - margin) {
        doc.addPage();
        yOffset = newPageTopMargin;
      }
    };
  
    checkIfNewPageNeeded(20);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'italic', 'bold');
    doc.text(judulProposal, pageWidth / 2, yOffset, { align: 'center', lineHeight: 1.5 });
    yOffset += 20;
    doc.setFontSize(15);
  
    for (const [index, form] of forms.entries()) {
      checkIfNewPageNeeded(20);
      doc.setFont('helvetica', 'bold'); 
      yOffset += justifyText(doc, `${form.judul}`, margin, yOffset, maxLineWidth, 10);
      doc.setFont('helvetica', 'normal'); 
      yOffset += 10;
  
      const element = document.createElement('div');
      element.innerHTML = form.latarbelakang;
      document.body.appendChild(element);
  
      try {
        for (const child of element.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.nodeValue.trim();
            if (text.length > 0) {
              const lines = doc.splitTextToSize(text, maxLineWidth);
              lines.forEach(line => {
                if (yOffset + 10 > pageHeight - margin) {
                  doc.addPage();
                  yOffset = newPageTopMargin;
                }
                doc.text(line, margin, yOffset);
                yOffset += 10;
              });
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.tagName === 'IMG') {
              const contentHeight = await addImage(doc, child, yOffset);
              checkIfNewPageNeeded(contentHeight);
              yOffset += contentHeight;
            } else {
              const text = child.innerText.trim();
              if (text.length > 0) {
                const lines = doc.splitTextToSize(text, maxLineWidth);
                lines.forEach(line => {
                  if (yOffset + 10 > pageHeight - margin) {
                    doc.addPage();
                    yOffset = newPageTopMargin;
                  }
                  doc.text(line, margin, yOffset);
                  yOffset += 10;
                });
              }
  
              const images = child.getElementsByTagName('img');
              for (const img of images) {
                const contentHeight = await addImage(doc, img, yOffset);
                checkIfNewPageNeeded(contentHeight);
                yOffset += contentHeight;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing content for PDF:', error);
      } finally {
        document.body.removeChild(element);
      }
    }
    doc.save('proposal.pdf');
  };
  
  const handleSubmit = () => {
    console.log(forms);
    console.log(images);
  };

  const printLihat = (formIndex, value) => {
    setLihat(value)
    handleQuillChange(formIndex, value)
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-semibold mb-4">Proposal Form</h1>
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-medium mb-2">Judul Proposal</h2>
        <input
          type="text"
          name="judulProposal"
          value={judulProposal}
          onChange={handleJudulChange}
          placeholder="Judul Proposal"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      
      {forms.map((form, formIndex) => (
                 <motion.div
                 key={formIndex}
                 className="mb-6 p-4 border rounded"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
               >
    <h2 className="text-lg font-medium mb-2">Bagian {formIndex + 1}</h2>
    <div className="mb-4">
      <input
        type="text"
        value={form.judul}
        onChange={(e) => handleFormChange(formIndex, 'judul', e.target.value)}
        placeholder="Judul Bagian Proposal"
        name="judul"
        className="border border-gray-300 rounded-md p-2 mr-2 w-full"
      />
      <ReactQuill
        ref={(el) => (quillRefs.current[formIndex] = el)}
        value={form.latarbelakang || ''}
        onChange={(value) => printLihat(formIndex, value)}
        placeholder="Isi"
        modules={modules}
        formats={formats}
      />
    </div>
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => moveFormUp(formIndex)}
        disabled={formIndex === 0}
        className={`py-2 px-4 rounded ${formIndex === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        ▲
      </button>
      <button
        onClick={() => moveFormDown(formIndex)}
        disabled={formIndex === forms.length - 1}
        className={`py-2 px-4 rounded ${formIndex === forms.length - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        ▼
      </button>
    </div>
          {formIndex > 4 && (
      <button
        onClick={() => removeForm(formIndex)}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Hapus Bagian
      </button>
    )}
        </motion.div>
      ))}
      <button
        onClick={addForm}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
      >
        Tambah Bagian
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Kirim
      </button>
      <button
        onClick={handleDownloadPDF}
        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ProposalForm;
