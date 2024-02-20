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
    "https://media.istockphoto.com/id/1352321814/vector/3d-isometric-flat-vector-conceptual-illustration-of-carbon-footprint.jpg?s=612x612&w=0&k=20&c=Kq0fomWgvD9xTt9bZaCUwiE_Pe066zGNFZgJHz_T-GI=",
    "data:image/png;base64,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",

    "https://media.licdn.com/dms/image/C4E12AQGNC7T8V7tPKQ/article-cover_image-shrink_600_2000/0/1520142110482?e=2147483647&v=beta&t=2NTT4mpuqVpq35WrtcTB7GleCWvYyD1on5uhIjh3gtI",
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
        {/* ============== */}
        <div className="section0home">
          <div class="complete-launch">
            <div class="left">
              <img
                src="https://png.pngtree.com/png-vector/20220724/ourmid/pngtree-people-looking-nature-mountain-tourist-png-image_6063213.png"
                alt=""
              />

              <div class="explore sameee">
                <pa className="pppIde">
                  Explore various impactful programs around you.
                </pa>

                <button
                  onClick={() => {
                    window.location.href = "/projects";
                  }}>
                  Let's go
                </button>
              </div>
            </div>

            <div class="right">
              <img
                src="https://i.pngimg.me/thumb/f/720/d24de355df734126940b.jpg"
                alt=""
              />

              <div class="create sameee">
                <pa>Launch your own program by working together.</pa>

                <button
                  onClick={() => {
                    window.location.href =
                      "https://forms.gle/8iATQ6J75CXNGsYq5";
                  }}>
                  create
                </button>
              </div>
            </div>
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
