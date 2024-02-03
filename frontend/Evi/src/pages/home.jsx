import React from "react";
import Navbar from "../components/Nav";
import "../pages/home.css";
import { Fade } from "react-slideshow-image";
import { blue } from "@mui/material/colors";
import Slideshow  from "../components/function components/Slideshow";"../components/function components/Slideshow"

const Home = () => {
  // const images = [
  //   "https://r4.wallpaperflare.com/wallpaper/307/184/920/ubuntu-linux-terminal-hacker-wallpaper-3f13574622d214245b2916d0d5d3101a.jpg",
  //  "https://th.bing.com/th/id/OIP.avb9nDfw3kq7NOoP0grM4wHaEK?rs=1&pid=ImgDetMain",
  //   'https://example.com/image3.jpg',
  // ];



  return (
    <>
      <header className="header"></header>
      <main className="mainH">
        {/* <div className="boxH">
        <Slideshow images={images}></Slideshow>
        </div>
        <div className="boxH1"></div> */}
      </main>
    </>
  );
};

export default Home;
