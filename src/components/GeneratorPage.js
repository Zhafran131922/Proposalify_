import React, { useState } from 'react';
import '../styles/GeneratorPage.css'; // Import file CSS untuk halaman generator
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function GeneratorPage() {
  const [proposalData, setProposalData] = useState({
    title: 'Proposal Default',
    background: '',
    goal: '',
    steps: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposalData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Kirim proposal
    console.log('Proposal Data:', proposalData);
  };

  return (
    <div className="generator-page">
      {/* Navbar */}
      <nav>
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <span className="logo-text">Proposalify</span>
          </div>
          {/* Menu */}
          <ul className="menu">
            <li><Link to="/services">Services</Link></li>
            <li className="contact-us">
              <span>Contact Us</span>
              <div className="contact-info">
                <p>Email: example@example.com</p>
                <p>Phone: +123456789</p>
              </div>
            </li>
            {/* Tambahkan menu lain di sini */}
          </ul>
          {/* Login dan Sign Up */}
          <div className="auth-buttons">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Konten */}
      <div className="content">
        <h1>Proposal Generator</h1>
        {/* Formulir untuk mengisi proposal */}
        <form className="proposal-form">
          <label htmlFor="title">Judul Proposal:</label>
          <input type="text" id="title" name="title" value={proposalData.title} onChange={handleChange} />

          <label htmlFor="background">Latar Belakang:</label>
          <textarea id="background" name="background" value={proposalData.background} onChange={handleChange}></textarea>

          <label htmlFor="goal">Tujuan dan Manfaat:</label>
          <textarea id="goal" name="goal" value={proposalData.goal} onChange={handleChange}></textarea>

          <label htmlFor="steps">Tahapan Usaha:</label>
          <textarea id="steps" name="steps" value={proposalData.steps} onChange={handleChange}></textarea>

          <label htmlFor="category">Kategori Usaha:</label>
          <input type="text" id="category" name="category" value={proposalData.category} onChange={handleChange} />
        </form>

        {/* Canvas untuk menampilkan hasil proposal secara live */}
        <div className="proposal-canvas">
          <h2>Hasil Proposal:</h2>
          <div className="proposal-preview">
            <h3>{proposalData.title}</h3>
            <p>Latar Belakang: {proposalData.background}</p>
            <p>Tujuan dan Manfaat: {proposalData.goal}</p>
            <p>Tahapan Usaha: {proposalData.steps}</p>
            <p>Kategori Usaha: {proposalData.category}</p>
          </div>
        </div>

        {/* Tombol untuk mengirimkan proposal dan mengunduh PDF */}
        <div className="proposal-buttons">
          <button onClick={handleSubmit}>Submit Proposal</button>
          <button>Unduh PDF</button>
        </div>
      </div>
    </div>
  );
}

export default GeneratorPage;
