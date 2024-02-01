import React from "react";
import "../components/nav.css";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { green, red } from "@mui/material/colors";
const username = "Username";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {" "}
        <h1 style={{fontFamily:"sans-serif",color:"green"}}>E</h1>
      </div>
      <div className="list">
        {" "}
        <Avatar
          alt="Travis Howard"
          src="https://avatars.githubusercontent.com/u/145251086?v=4"
        />{" "}
        <h1 style={{ color: "white", fontFamily: "sans-serif", fontSize: 13 }}>
          {username}
        </h1>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/login "}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/regester "}>Regester</NavLink>
          </li>
          <li>
            <NavLink to={"/settings "}>Settings</NavLink>
          </li>

          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
