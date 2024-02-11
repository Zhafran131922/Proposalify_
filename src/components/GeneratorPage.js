import React from 'react';
import '../styles/GeneratorPage.css';// Import file CSS untuk halaman generator

function GeneratorPage() {
  return (
    <div className="generator-page">
      {/* Navbar */}
      <nav>
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <a href="/">Logo</a>
          </div>
          {/* Menu */}
          <ul className="menu">
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            {/* Tambahkan menu lain di sini */}
          </ul>
          {/* Login dan Sign Up */}
          <div className="auth-buttons">
            <a href="/login">Log In</a>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Konten */}
      <div className="content">
        <h1>Proposal Generator</h1>
        <p>Anda dapat menggunakan alat ini untuk membuat proposal dengan cepat dan mudah.</p>
        {/* Formulir atau komponen lain untuk menghasilkan proposal */}
      </div>
    </div>
  );
}

export default GeneratorPage;
