import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Menggunakan Routes dan Route

import HomePage from './components/HomePage';
import GeneratorPage from './components/GeneratorPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generator" element={<GeneratorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
