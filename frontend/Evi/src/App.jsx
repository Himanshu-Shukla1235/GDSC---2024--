import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home"

function App() {
  return (
    <>
      
        <BrowserRouter>
<<<<<<< HEAD
          
=======
        
>>>>>>> 14ff3e95036af2e6d4ecd1ecf45c82626eb63b72
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      
    
    </>
  );
}

export default App;
