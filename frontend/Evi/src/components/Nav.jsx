import React ,{useState}from "react";
import "../components/nav.css";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { green, red } from "@mui/material/colors";
const username = "Username";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import "../Styles/main.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<div className="header">
			<div className="mainComponent">
        <h3>LOGO</h3>
			<nav ref={navRef}>
				
			    <a onClick={showNavbar}><NavLink to={'/'}>Home</NavLink></a>
				<a onClick={showNavbar}><NavLink to={'/contact'}>contact</NavLink></a>
				<a onClick={showNavbar}><NavLink to={'/about'}>about</NavLink></a>
				<a onClick={showNavbar}><NavLink to={'/login'}>login</NavLink></a>
				<a onClick={showNavbar}><NavLink to={'/register'}>Register</NavLink></a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
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

