import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/footer";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "../pages/home.css";
import Nav from "../components/Nav";
import { colors } from "@mui/material";
import SlideInComponent from "../components/function components/scrollEffect/slide";
import SlideInComponent2 from "../components/function components/scrollEffect/slide2";

const Home = () => {
  const words = [
    "Earth-Friendly Initiatives for a Cleaner Future",
    "Preserving our environment is not just a responsibility; it's a commitment to the well-being of our planet and future generations.",
  ];
  const [typedText, setTypedText] = useState(""); // State for the text displayed in div

  // Callback function to update the text in state
  const onTypingEnd = () => {
    // You can set the final text or perform any other action here
    setTypedText("manshi");
  };
  // const [isScrolled,setanim]=useState(true)
  // useEffect(() => {
  //   const changeBackground = () => {
  //     if (window.scrollY >= 40) {
  //       setanim(true);
  //     } else {
  //       setanim(false);
  //     }
  //   };

  //   window.addEventListener("scroll", changeBackground);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", changeBackground);
  //   };
  // }, []);

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
              <Typewriter
                words={words}
                cursor
                loop={true}
                typeSpeed={100}
                className="custom-typewriter"
              >
                <Cursor className="green-cursor" />
              </Typewriter>
            </h1>
          </div>
        </div>
        <div className="boxH2">
          <div className="boxH21">
            {" "}
            <SlideInComponent elementId="Ht1">
              <p id="Ht1" style={{ color: "black" }}>
                "Guardians of a healthier tomorrow, let's nurture our planet
                today. Each eco-friendly choice is a step towards a sustainable
                harmony, where the rhythm of nature dances in vibrant sync."
              </p>
            </SlideInComponent>
          </div>
          <div className="boxH22"> </div>
        </div>
        <div id="mapclic" className="boxH3">
          <div className="boxH31">
            <SlideInComponent2 elementId="34">
              <h1 id="34" style={{ color: "white" }}>
                hello
              </h1>
            </SlideInComponent2>
          </div>
        </div>

        <div className="boxH4">
          <div className="boxH42"></div>
          <div className="boxH41">
            <SlideInComponent2 elementId="Ht4">
              <p id="Ht4" style={{ color: "black" }}>
                "Leave only footprints, not carbon footprints. Every small act
                to save the Earth is a giant leap towards a cleaner, greener
                future. Be mindful, reduce your carbon footprint, and let the
                echoes of your actions harmonize with the planet's heartbeat."
              </p>
            </SlideInComponent2>
          </div>
        </div>
        <div className="boxH5"></div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
