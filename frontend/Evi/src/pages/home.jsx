import React from "react";
import Navbar from "../components/Nav";
import Footer from '../components/footer'

import "../pages/home.css";
import { Fade } from "react-slideshow-image";
import { blue } from "@mui/material/colors";
import Nav from "../components/Nav";

const Home = () => {




  return (
    <>
      <header className="header1"><Nav></Nav></header>
      <main className="main2">
        <div className="boxH">
       
        </div>
        <div><div></div></div>
        <div className="boxH1"></div>
      </main>
      <footer className="footer"><Footer></Footer></footer>
      
    </>
  );
};

export default Home;
