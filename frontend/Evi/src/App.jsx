import React from "react";
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

function App() {
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
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
