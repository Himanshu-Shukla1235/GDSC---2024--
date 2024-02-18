import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/footer";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "../pages/home.css";
import Nav from "../components/Nav";
import { colors } from "@mui/material";
import SlideInComponent from "../components/function components/scrollEffect/slide";
import SlideInComponent2 from "../components/function components/scrollEffect/slide2";
import Contact from "../components/contact";

import CalculateIcon from "@mui/icons-material/Calculate";
import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://climate-news-feed.p.rapidapi.com/page/1",
  params: { limit: "10" },
  headers: {
    "X-RapidAPI-Key": "d8eda76f95msh9261a8d374f5391p1b4c64jsnb3786b0069df",
    "X-RapidAPI-Host": "climate-news-feed.p.rapidapi.com",
  },
};

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

  // ====================================================
  const [news, setNews] = useState([]);
  const getNews = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data.articles);
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <header className="header1">
        <Nav />
      </header>
      <main className="main2">
        <div className="boxH1">
          <div className="boxH11">
            {" "}
            <button>check</button>
            <h1 style={{ fontWeight: 500, fontSize: 30 }}>
              {/* <Typewriter
                words={words}
                cursor
                loop={true}
                typeSpeed={100}
                className="custom-typewriter">
                <Cursor className="green-cursor" />
              </Typewriter> */}
            </h1>
          </div>
        </div>
        {/* ====================================== */}
        <div className="section0home"></div>

        {/* ============================================== */}
        <div className="section1">
          <div className="addYourOffset section1ele">
            <CalculateIcon className="iconFe"></CalculateIcon>

            <p>
              Measure your impact, shape a sustainable tomorrow: Calculate your
              carbon footprint now and pave the way for a greener future!
            </p>
            <button>measure</button>
          </div>
          <div className="donation section1ele">
            <VolunteerActivismIcon className="iconFe"></VolunteerActivismIcon>
            <p>
              Be a climate hero: Support change with a single click! Donate to
              fight climate change and champion a sustainable world
            </p>
            <button>Donate</button>
          </div>
          <div className="education section1ele">
            <SchoolIcon className="iconFe"> </SchoolIcon>
            <p>
              Ignite environmental awareness: Dive into carbon literacy with a
              single click. Explore, learn, and empower change for a greener
              future!
            </p>
            <button>go and Check</button>
          </div>
        </div>
        {/* news */}
        <div className="news">
          <h1>News:</h1>
          {news.map((item) => (
            <div className="newsContainer">
              <img
                src={item.thumbnail}
                alt=""
                style={{ height: "200px", width: "200px" }}
              />
              <div>
                <p>{item.title}</p>
                <a href={item.url}>learn more</a>
              </div>
            </div>
          ))}
        </div>

        <Contact />
      </main>
      <footer className="footer">
        <Footer className="footerContact" />
      </footer>
    </>
  );
};

export default Home;
