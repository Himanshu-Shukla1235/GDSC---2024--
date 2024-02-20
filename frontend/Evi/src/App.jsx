import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Contact from "./components/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Chat from "./pages/chat.jsx";
import Earth from "../src/pages/earth.jsx";
import Air from "./components/airquality.jsx";
import Education from "./pages/education.jsx";
// import Whether from "../src/components/whether.jsx"
import axios from "axios";
// import Weather from "../src/components/whether.jsx"
import Corboncal from "../src/components/carboncalc.jsx";
import ScrapingPage from "../src/components/webscrap.jsx";
import PopupPage from "../src/components/function components/popupPage.jsx";
import Carbcal2 from "../src/components/carboncal2.jsx";
import Feed from "./pages/feed.jsx";
import Feedbox from "../src/components/feedBox.jsx"
import Addfeed from "../src/components/addFeed.jsx"
import CarbonCalculator3 from "../src/components/carbocal3.jsx"
import Testing2 from "../src/components/testing2.jsx"
import Comment from "../src/components/comments.jsx"
import AboutPage from "./pages/about.jsx";
import UserCFPoverview from "../src/components/overallcrabonuserData.jsx"
import ClimateProjects from './pages/projects.jsx'


function App() {
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    }
  }, []);

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
          <Route path="/feed" element={<Feed />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/education" element={<Education />} />
          <Route path="/corbon" element={<Corboncal></Corboncal>} />
          <Route path="/web" element={<ScrapingPage></ScrapingPage>} />
          <Route path="/popup" element={<PopupPage></PopupPage>} />
          <Route path="/corbon2" element={<Carbcal2></Carbcal2>} />
          <Route
            path="/corbon3"
            element={<CarbonCalculator3></CarbonCalculator3>}
          />
          <Route path="/fb" element={<Feedbox></Feedbox>} />
          <Route path="/afb" element={<Addfeed></Addfeed>} />
          <Route path="/test2" element={<Testing2></Testing2>} />
          <Route path="/comment" element={<Comment></Comment>} />
          <Route
            path="/UserCFPover"
            element={<UserCFPoverview></UserCFPoverview>}
          />
          <Route
            path="/projects"
            element={<ClimateProjects></ClimateProjects>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
