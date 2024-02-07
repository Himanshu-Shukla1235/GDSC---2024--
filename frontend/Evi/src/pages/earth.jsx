import { useState, useEffect } from "react";
import Map from "../components/Map";
import Footer from "../components/footer";
import Navbar from "../components/Nav";
import { NavLink } from "react-router-dom";

import "../pages/earth.css";

const Earth = () => {
  const [mapLocation, setMapLocation] = useState(null);

 

  return (
    <>
      <header className="headerE">
        <Navbar />
      </header>
      <main className="mainE">
        <div className="boxE2">
          <Map setMapLocation={setMapLocation} />
        </div>
        <div className="boxE3">
          <div className="boxE31"></div>
          <div className="boxE31">
            <NavLink to={'/airQuality'}>AIR QUALITY</NavLink>
          </div>
          <div className="boxE31">
            <NavLink to={'/airQuality'}>AIR QUALITY</NavLink>
          </div>
        </div>
      </main>
      <footer className="footerE">
        <Footer />
      </footer>
    </>
  );
};

export default Earth;
