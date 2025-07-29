// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("App rendered");

function App() {
  return (
    <Router>
      <div className="min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
