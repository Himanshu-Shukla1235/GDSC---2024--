import React, { useEffect, useState } from "react";
import "../components/nav.css";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { green, red } from "@mui/material/colors";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faBars } from "@fortawesome/free-solid-svg-icons";
const username = "Username";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import "../Styles/main.css";

function Navbar() {
  const navRef = useRef();

  const [UpDown, setUpDown] = useState("");

  const showNavbar = () => {
    if (UpDown == "responsive_nav") {
      setUpDown("");
      return;
    }
    setUpDown("responsive_nav");
    console.log("clicked");
  };

  //setting if useris alredy loged in
  const [loginOption, setLoginOption] = useState("Sign-in/Sign-up");
  const [logoutRoute, setlogoutRoute] = useState("/login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setLoginOption("Logout");
      setlogoutRoute("");
    }
    getUser();

    //gettting avatar from user data
  }, []);

  //function to add avatar from data base
  const getUser = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/auth/getUser");

    console.log(res.data[0].avatar);
    setImgUrl(res.data[0].avatar);
  };

  const logout = () => {
    if (logoutRoute == "/login") return;
    var confirmLogout = confirm("Are you sure you want to logout?");

    // Check the user's choice
    if (confirmLogout) {
      // User clicked 'Yes', perform logout action
      alert("Logging out...");
      localStorage.removeItem("token");
      setLoginOption("Sign-in/Sign-up");
      setlogoutRoute("/login");
      window.location.href = "/";
      // Add your logout logic here
    } else {
      // User clicked 'No', do nothing or handle accordingly
      alert("Logout canceled.");
    }
  };

  //======================================

  const [loaderClass, setLoaderClass] = useState("navLoaderOFF");
  const [avatar, setAvatar] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [uploadError, setUploadError] = useState();
  const [inputValue, setInputValue] = useState();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", avatar);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "dydbv12n6";
      let resourceType = "image";
      let api = `http://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const transformations = [{ width: 300, height: 300, crop: "fill" }];
      axios.defaults.headers.common["Authorization"] = undefined;
      const res = await axios.post(api, data);

      //re
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      }

      const { secure_url } = res.data;
      console.log(secure_url);
      setImgUrl(secure_url);

      return secure_url;
    } catch (error) {
      console.log(error.response.data.error.message);
      setUploadError(error.response.data.error.message);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaderClass("navLoaderON");

    try {
      const imgUrl = await uploadFile(image);
      const res = await axios.patch(
        "http://localhost:5000/api/v1/auth/upload",
        {
          avatar: imgUrl,
        }
      );
      setLoaderClass("navLoaderOFF");
      setAvatarUpload("avatarUploadOFF");
    } catch (error) {
      // console.log(error.response);
      setLoaderClass("navLoaderOFF");
    }
  };

  //=====================================
  const [avatarUpload, setAvatarUpload] = useState("avatarUploadOFF ");

  // const navRef = useRef(); // Change here
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setAvatarUpload("avatarUploadOFF");
        setUploadError("");
        setInputValue(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navRef]);

  return (
    <div className="header">
      <h3>LOGO</h3>
      <div className="mainComponent">
        <nav ref={navRef} className={UpDown}>
          <a className="elementsNav" onClick={showNavbar}>
            <NavLink to={"/"}>Home</NavLink>
          </a>
          <a className="elementsNav" onClick={showNavbar}>
            <NavLink to={"/contact"}>contact</NavLink>
          </a>
          <a className="elementsNav" onClick={showNavbar}>
            <NavLink to={"/about"}>about</NavLink>
          </a>
          <a className="elementsNav" onClick={showNavbar}>
            <NavLink onClick={logout} to={logoutRoute}>
              {loginOption}
            </NavLink>
          </a>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
      <div className="avatar">
        {" "}
        <Avatar
          className="avatar2"
          onClick={(e) => {
            e.stopPropagation(); // Stop the click event from reaching the document
            if (avatarUpload === "avatarUpload")
              setAvatarUpload("avatarUploadOFF");
            else setAvatarUpload("avatarUpload");
          }}
          alt="himanshu"
          src={imgUrl}></Avatar>
        <form ref={navRef} onSubmit={handleSubmit} className={avatarUpload}>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              value={inputValue}
              required
            />
          </div>
          <div>
            <button type="submit">
              <p>upload</p>
              <FontAwesomeIcon
                className={loaderClass}
                icon={faSpinner}
                rotation={270}
                spin
                style={{ color: "#4f33a3" }}
              />
            </button>
          </div>
          <a style={{ color: "red" }}>{uploadError}</a>
        </form>
      </div>
    </div>
  );
}

export default Navbar;

// const Navbar = () => {
//   const [isOpen,setIsOpen]=useState(false);

//   const toogleNav=()=>{
//     setIsOpen(!isOpen);
//   }

//   return (
//     <>
//     <nav className="navbar">

//      <div className="mainElement">
//        <ul className="navElements">
//         <li className="logo"><a href="#">logo</a></li>
//         <li>Home</li>
//         <li>Contact</li>
//         <li>About us</li>
//         <li>Photo</li>
//       </ul>
//      </div>
//      <button>☰</button>

//     </nav>

//     </>
//   );
// };

// export default Navbar;
// import  { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNav = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className={`navbar ${isOpen ? 'open' : ''}`}>
//       <div className="mainElement">
//         <button className="toggle-button" onClick={toggleNav}>
//           ☰
//         </button>
//         <ul className="navElements">
//           <li className="logo"><a href="#">logo</a></li>
//           <li>Home</li>
//           <li>Contact</li>
//           <li>About us</li>
//           <li>Photo</li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
