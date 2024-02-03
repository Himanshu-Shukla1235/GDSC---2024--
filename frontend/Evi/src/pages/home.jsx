import React, { useState } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/footer";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "../pages/home.css";
import Nav from "../components/Nav";
import { colors } from "@mui/material";

const Home = () => {
  const words = ["Earth-Friendly Initiatives for a Cleaner Future","Preserving our environment is not just a responsibility; it's a commitment to the well-being of our planet and future generations."];
  const [typedText, setTypedText] = useState(""); // State for the text displayed in div

  // Callback function to update the text in state
  const onTypingEnd = () => {
    // You can set the final text or perform any other action here
    setTypedText("manshi");
  };


  return (
    <>
      <header className="header1">
        <Nav />
      </header>
      <main className="main2">
        <div className="boxH1">
          <div className="boxH11">
            {" "}
            <h1 style={{ fontWeight: 500, fontSize: 30 }}>
              <Typewriter words={words} cursor loop={true} typeSpeed={100}>
               <Cursor className="green-cursor" cursorStyle={{color: "green"}}/>
              </Typewriter>
            </h1>
          </div>
        </div>
        <div className="boxH2">
         
          <div className="boxH21"> <h1>
          "Welcome to our platform dedicated to promoting a healthy Earth and environment."
          
          </h1></div>
        </div>
        <div className="boxH3"></div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
