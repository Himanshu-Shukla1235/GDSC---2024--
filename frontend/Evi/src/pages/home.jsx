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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import gsap from "gsap";
const options = {
  method: "GET",
  url: "https://climate-news-feed.p.rapidapi.com/page/1",
  params: { limit: "10" },
  headers: {
    "X-RapidAPI-Key": "d8eda76f95msh9261a8d374f5391p1b4c64jsnb3786b0069df",
    "X-RapidAPI-Host": "climate-news-feed.p.rapidapi.com",
  },
};

const imagesFeatures = [];
const imageUrls = [
  "https://media.istockphoto.com/id/1305691581/vector/planting-of-trees-to-absorb-co2-in-compensation-of-same-amount-produced.jpg?s=612x612&w=0&k=20&c=rKxyvzrK6ESxasgd421t72VXKqpJtaOnQP6GghpbT2g=",
  "https://r4.wallpaperflare.com/wallpaper/764/431/702/river-trees-forest-clouds-wallpaper-d4ba55cd41062d25051044aa61cfaf9c.jpg",
  "https://r4.wallpaperflare.com/wallpaper/270/709/236/macos-mojave-macbook-pro-apple-computer-wallpaper-07ff12647fa5af1aef72f49111118755.jpg",
  // ... add more image URLs as needed
];

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

  //======================= slide show
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNav, setCurrentNav] = useState(0);
  const [currentDes, setCurrentDes] = useState(0);

  const imageUrls = [
    "https://media.istockphoto.com/id/1305691581/vector/planting-of-trees-to-absorb-co2-in-compensation-of-same-amount-produced.jpg?s=612x612&w=0&k=20&c=rKxyvzrK6ESxasgd421t72VXKqpJtaOnQP6GghpbT2g=",
    "https://r4.wallpaperflare.com/wallpaper/764/431/702/river-trees-forest-clouds-wallpaper-d4ba55cd41062d25051044aa61cfaf9c.jpg",
    "https://r4.wallpaperflare.com/wallpaper/270/709/236/macos-mojave-macbook-pro-apple-computer-wallpaper-07ff12647fa5af1aef72f49111118755.jpg",
    // ... add more image URLs as needed
  ];

  const navLinks = ["/earth", "/chat", "/feed"];

  const navDescriptions = [
    "Calculate your carbon footprint today and take a step towards a greener future.",
    "Let's break the silence and talk climate! Join the conversation with people from every corner of the globe to create a united voice for our planet.",
    "Unleash your creativity! Share your climate-saving ideas and join hands in shaping a sustainable tomorrow.",
  ];

  const updateIndex = (direction) => {
    const tl = gsap.timeline();

    if (direction === "prev") {
      tl.to(".slide", { opacity: 0, duration: 0.5 })
        .call(() => {
          setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
          );
          setCurrentNav(
            (prevNav) => (prevNav - 1 + navLinks.length) % navLinks.length
          );
          setCurrentDes(
            (prevDes) =>
              (prevDes - 1 + navDescriptions.length) % navDescriptions.length
          );
        })
        .to(".slide", { opacity: 1, duration: 0.5 });
    } else if (direction === "next") {
      tl.to(".slide", { opacity: 0, duration: 0.5 })
        .call(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
          setCurrentNav((prevNav) => (prevNav + 1) % navLinks.length);
          setCurrentDes((prevDes) => (prevDes + 1) % navDescriptions.length);
        })
        .to(".slide", { opacity: 1, duration: 0.5 });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateIndex("next");
    }, 8000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <header className="header1">
        <Nav />
      </header>
      <main className="main2">
        <div className="boxH1">
          <img src={imageUrls[currentIndex]} alt="" className="featuresShow" />
          <div className="internalButtons">
            <p onClick={() => updateIndex("prev")}>
              <ArrowBackIosIcon className="arrows" />
            </p>
            <div className="middleBoxNav">
              <p className="discriptionOfNav">{navDescriptions[currentDes]}</p>
              <a href={navLinks[currentNav]}>
                <button className="buttonForNav">go and check--</button>
              </a>
            </div>
            <p onClick={() => updateIndex("next")}>
              <ArrowForwardIosIcon className="arrows" />
            </p>
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
            <a href="/earth">
              <button>measure</button>
            </a>
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
            <a href="/education">
              <button>go and Check</button>
            </a>
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
