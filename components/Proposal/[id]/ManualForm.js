import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProposalForm = ({ setProposalData, setPreviewData }) => {
  const router = useRouter();
  const [lihat, setLihat] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [forms, setForms] = useState([]);
  const [judulProposal, setJudulProposal] = useState('');
  const quillRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/proposals/${router.query.id}`);
        const data = await response.json();
        
        setJudulProposal(data.judul);
        const initialForms = data.formulirs.map(form => ({
          judul: form.judulFormulir,
          latarbelakang: form.isi
        }));
        setForms(initialForms);
        setIsEditing(true);
        quillRefs.current = initialForms.map(() => React.createRef());
        setPreviewData({ judulProposal: data.judul, forms: initialForms });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router.query.id, setPreviewData]);

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

  const handleUpdate = async () => {
    const dataToSend = {
      judul: judulProposal,
      formulirs: forms.map(form => ({
        judulFormulir: form.judul,
        isi: form.latarbelakang,
      })),
    };

    try {
      const token = localStorage.getItem('token'); // Adjust this based on where you store the token

      const response = await fetch(`http://localhost:5000/api/proposals/${router.query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      toast.success('Proposal updated successfully!');
      router.push('/userdash');
    } catch (error) {
      console.error('Error updating proposal:', error);
      toast.error('Error updating proposal. Please try again.');
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      user_id: localStorage.getItem('userId'),
      judul: judulProposal,
      formulirs: forms.map(form => ({
        judulFormulir: form.judul,
        isi: form.latarbelakang,
      })),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/proposals/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
            onClick={handleSubmit}
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
          <div className="flex justify-end mt-2 gap-2">
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
              onClick={() => moveFormUp(index)}
              disabled={index === 0}
            >
              ▲
            </button>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
              onClick={() => moveFormDown(index)}
              disabled={index === forms.length - 1}
            >
              ▼
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
          onClick={isEditing ? handleUpdate : handleSubmit}
        >
          Kirim Data
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProposalForm;
