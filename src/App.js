import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Menggunakan Routes dan Route

import HomePage from './components/HomePage';
import Proposal from './components/Proposal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/proposal" element={<Proposal/>} />
            </Routes>
        </Router>
    );
}

export default App;
