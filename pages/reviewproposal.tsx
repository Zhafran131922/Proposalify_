import React, { useState } from 'react';
import TextField from './TextField';
import ProposalTable from './ProposalTable';

const ReviewProposalPage: React.FC = () => {
  const [formData, setFormData] = useState({
    judul: '',
    latarBelakang: '',
    deskripsiUsaha: '',
    lampiran: '',
    penutup: ''
  });

  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Peningkatan Kompetensi Siswa Menggunakan Software Virtual Tour Bagi SMKN 1 Semarang',
      studentName: 'Nama Mahasiswa',
      status: 'Belum di Revisi'
    },
    // Add more proposal objects as needed
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 lg:w-2/5">
        <h1 className="text-2xl font-bold mb-6 text-center">Review Proposal</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
          />
          <TextField
            label="Latar Belakang"
            name="latarBelakang"
            value={formData.latarBelakang}
            onChange={handleChange}
            isTextArea
          />
          <TextField
            label="Deskripsi Usaha"
            name="deskripsiUsaha"
            value={formData.deskripsiUsaha}
            onChange={handleChange}
            isTextArea
          />
          <TextField
            label="Lampiran"
            name="lampiran"
            value={formData.lampiran}
            onChange={handleChange}
          />
          <TextField
            label="Penutup"
            name="penutup"
            value={formData.penutup}
            onChange={handleChange}
            isTextArea
          />
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Simpan
            </button>
          </div>
        </form>
        <div className="mt-8">
          <ProposalTable proposals={proposals} />
        </div>
      </div>
    </div>
  );
};

export default ReviewProposalPage;
