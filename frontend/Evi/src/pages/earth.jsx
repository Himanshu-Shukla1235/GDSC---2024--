import { useState, useEffect } from "react";
import Map from "../components/Map";
import Footer from "../components/footer";
import Navbar from "../components/Nav";
import TextField from "@mui/material/TextField";
import MyLocationIcon from '@mui/icons-material/MyLocation';

import "../pages/earth.css";
const earth = () => {

  return (
    <>
      <header className="headerE">
        <Navbar></Navbar>
      </header>
      <main className="mainE">
        
        <div className="boxE2">
          <Map></Map>
        </div>
      </main>
      <footer className="footerE">
        <Footer></Footer>
      </footer>
    </>
  );
};

export default earth;
