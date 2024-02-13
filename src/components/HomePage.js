import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import file CSS untuk halaman beranda
import logo from '../images/logo.png';
import proposal1 from '../images/proposal1.jpg';
import monitor from '../images/monitor.png';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const texts = ['Jalan mudah untuk membuat proposal', 'Export langsung pekerjaan anda dalam bentuk PDF', 'Dapatkan berbagai template dari website ini', 'Pekerjaan anda akan direview langsung oleh dosen pembimbing'];

  useEffect(() => {
    let currentIndex = index;
    let text = '';
    let letter = '';

    const typingInterval = setInterval(() => {
      text = texts[currentIndex];
      letter = text.slice(0, currentText.length + 1);

      setCurrentText(letter);

      if (letter === text) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setCurrentText('');
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [index, currentText]);

  return (
    <div className="home-page">
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
          <li className="about">
            <span>About</span>
            <div class="about-info">
              <h2>About Us</h2>
              <p>Proposalify dibuat dengan tujuan....</p>
              {/* <img src={proposal1} alt="Gambar About" /> */}
            </div>
          </li>
            <li><Link to="/services">Services</Link></li>
            <li className="contact-us">
              <span>Contact Us</span>
              <div class="contact-info">
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
        <div className="text-and-button">
          <h1 className="fade-in">{currentText}</h1>
          <p className="fade-in"> Ini adalah aplikasi yang memudahkan Anda dalam membuat proposal dengan cepat dan mudah.</p>
          {/* Tombol untuk beralih ke halaman generator */}
          <div className="generator-button fade-in">
          <Link to="/proposal">
            <button>Buat Proposal</button>
          </Link>
        </div>

        </div>
        <div className="proposal1">
          <img src={proposal1} alt="proposal1" />
        </div>
      </div>
      {/* Teks di bagian atas */}

    </div>
  );
}

export default HomePage;
