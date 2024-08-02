import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./components/home/home"
import { Login } from "./components/authentication/login"
import { Signup } from "./components/authentication/signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App
