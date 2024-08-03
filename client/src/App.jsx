import React from "react";
import { useState, useEffect } from "react";
import { Header } from "./components/home/header"
import { Home } from "./components/home/home";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserProfile(storedUsername);
    }
  }, []);
  
  return (
    <Router>
      <Header userProfile={userProfile} setUserProfile={setUserProfile} /> 
      <Routes>
        <Route path="/" element={<Home userProfile={userProfile} setUserProfile={setUserProfile} />} />
        <Route path="/login" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App