import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import file CSS untuk halaman beranda

function HomePage() {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav>
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">Logo</Link>
          </div>
          {/* Menu */}
          <ul className="menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
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
        <h1>Selamat Datang di Aplikasi Proposal Generator</h1>
        <p>Ini adalah aplikasi yang memudahkan Anda dalam membuat proposal dengan cepat dan mudah.</p>
        {/* Tombol untuk beralih ke halaman generator */}
        <div className="generator-button">
          <Link to="/generator">
            <button>Go to Generator</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
