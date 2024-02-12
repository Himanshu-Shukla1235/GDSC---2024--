import React from "react";
import "./feed.css";
import Navbar from "../components/Nav";
import Footer from "../components/footer";

const feed = () => {
  return (
    <>
      <header className="header1">
        <Navbar></Navbar>
      </header>
      <main className="mainFeed"> 
      <div className="feedContainer">
         <div className="feedSection1"></div>
         <div className="feedSection2"></div>
         <div className="feedSection3"></div>

      </div>
      </main>

     

      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default feed;
