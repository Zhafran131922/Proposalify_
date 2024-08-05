import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProposalForm = ({ setProposalData, setPreviewData }) => {
  const router = useRouter();
  const [lihat, setLihat] = useState('');
  const [forms, setForms] = useState([
    { judul: 'Latar Belakang', latarbelakang: '' },
    { judul: 'Deskripsi Usaha', latarbelakang: '' },
    { judul: 'Kesimpulan', latarbelakang: '' },
    { judul: 'Lampiran', latarbelakang: '' },
    { judul: 'Penutup', latarbelakang: '' },
  ]);
  const [judulProposal, setJudulProposal] = useState('');
  const quillRefs = useRef(Array(forms.length).fill(null).map(() => React.createRef()));

  useEffect(() => {
    setPreviewData({ judulProposal, forms });
  }, [judulProposal, forms, setPreviewData]);

  useEffect(() => {
    quillRefs.current = quillRefs.current.slice(0, forms.length);
  }, [forms.length]);

  const updatePreviewData = () => {
    const formData = {
      judulProposal,
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
        const temp = { ...newForms[index] };
        newForms[index] = { ...newForms[index - 1] };
        newForms[index - 1] = temp;
        return newForms;
      });
    }
  };

  const moveFormDown = (index) => {
    if (index < forms.length - 1) {
      setForms((prevForms) => {
        const newForms = [...prevForms];
        const temp = { ...newForms[index] };
        newForms[index] = { ...newForms[index + 1] };
        newForms[index + 1] = temp;
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
  
  const handleSubmit = async () => {
    const dataToSend = {
        user_id: sessionStorage.getItem('userId'),
        judul: judulProposal,
        formulirs: forms.map(form => ({
            judulFormulir: form.judul,
            isi: form.latarbelakang,
        })),
    };

    try {
        const response = await fetch('http://localhost:5000/api/proposals/proposals/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);
        toast.success('Proposal submitted successfully!');
        router.push('/userdash');
    } catch (error) {
        console.error('Error submitting form data:', error);
        toast.error('Error submitting form data. Please try again.');
    }
};

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Form Proposal</h1>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judulProposal">
          Judul Proposal
        </label>
        <input
          type="text"
          id="judulProposal"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={judulProposal}
          onChange={handleJudulChange}
        />
      </div>
      {forms.map((form, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Judul"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              value={form.judul}
              onChange={(e) => handleFormChange(index, 'judul', e.target.value)}
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => removeForm(index)}
            >
              Hapus
            </button>
          </div>
          <ReactQuill
            ref={quillRefs.current[index]}
            value={form.latarbelakang}
            onChange={(value) => handleQuillChange(index, value)}
            modules={modules}
            formats={formats}
          />
          <div className="flex justify-between mt-2">
            <button
              className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
              onClick={() => moveFormUp(index)}
              disabled={index === 0}
            >
              Naik
            </button>
            <button
              className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
              onClick={() => moveFormDown(index)}
              disabled={index === forms.length - 1}
            >
              Turun
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={addForm}
        >
          Tambah Formulir
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Kirim Data
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProposalForm;
