import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Chat from "./pages/chat.jsx";
import Earth from "../src/pages/earth.jsx";
import Air from "./components/airquality.jsx";
// import Whether from "../src/components/whether.jsx"
import axios from "axios";
// import Weather from "../src/components/whether.jsx"
import Corboncal from "../src/components/carboncalc.jsx"

function App() {

useEffect(() => {
  const jwtToken = localStorage.getItem('token');
  if (jwtToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }
}, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/earth" element={<Earth />} />
          <Route path="/airQuality" element={<Air></Air>} />
          <Route path="/corbon" element={<Corboncal></Corboncal>} />
          
         

          
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
