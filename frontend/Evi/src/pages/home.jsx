import React from "react";
import Navbar from "../components/Nav";
// import "../pages/home.css";
import GMap from "../components/Map";
const Home = () => {
  return (
    <>
      {" "}
      <header className="header"></header>
      <main>
        <h1>hello i am from home page</h1>
     <GMap></GMap>
      </main>
    </>
  );
};
export default Home;
