import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"; // Import the Register page
import Dashboard from "./components/Dashboard";
import AuthProvider from "./AuthProvider";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
