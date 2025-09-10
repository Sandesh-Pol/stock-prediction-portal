import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import SignInForm from './components/SignInForm';
import RegisterForm from './components/RegisterForm'; // Import the Register page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/register" element={<RegisterForm />} />  
      </Routes>
    </Router>
  );
}

export default App;
