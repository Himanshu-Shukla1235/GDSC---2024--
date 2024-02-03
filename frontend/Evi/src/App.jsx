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
