import React, { useState } from 'react';
import '../styles/Proposal.css'; // Import file CSS untuk styling
import logo from '../images/logo.png';
import sampleImage from '../images/proposal1.jpg'; // Contoh gambar untuk live preview

function Proposal() {
  const [formData, setFormData] = useState({
    judul: '',
    latarbelakang: '',
    deskripsiusaha: '',
    rencanakegiatan: '',
    penutup: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan pengiriman proposal
    console.log('Data Proposal:', formData);
  };

  return (
    <div className="proposal-generator-container">
      <div className="canvas-container">
        {/* Canvas untuk menampilkan live preview */}
        <div className="live-preview page">
          {/* <h2>Live Preview</h2>
          <img src={sampleImage} alt="Live Preview" /> */}
          <div style={{ textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center', fontSize: '24px' }}>{formData.judul}</h3>
            <label style={{ fontWeight: 'bold' }}>Latar Belakang</label>
            {formData.latarbelakang.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <p>Deskripsi Usaha: {formData.deskripsiusaha}</p>
            <p>{formData.rencanakegiatan}</p>
            <p>{formData.penutup}</p>
          </div>
        </div>
      </div>
      <div className="form-container">
        {/* Formulir untuk mengisi data proposal */}
        <h1>Proposal Generator</h1>
        <form className="proposal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="judul">Title:</label>
            <input type="text" id="judul" name="judul" value={formData.judul} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="latarbelakang">Latar Belakang:</label>
            <textarea id="latarbelakang" name="latarbelakang" value={formData.latarbelakang} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="deskripsiusaha">Deskripsi Usaha:</label>
            <input type="text" id="deskripsiusaha" name="deskripsiusaha" value={formData.deskripsiusaha} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="penutup">Penutup:</label>
            <input type="text" id="penutup" name="penutup" value={formData.penutup} onChange={handleChange} />
          </div>
          <button type="submit">Submit Proposal</button>
        </form>
      </div>
    </div>
  );
}

export default Proposal;
