import React, { useState,useEffect } from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Co2Icon from "@mui/icons-material/Co2";
const footer = () => {

  const [footer,setFooter]=useState('displayNO');

  useEffect(()=>{
	

	const token=localStorage.getItem('token')
	if(token){
		setFooter('');
	}
	

  },[])

  return (
    <>
    <div className={footer}>
        <div id="homefooter">
        {/* <button onclick="openBottomnav()">O</button> */}

          <div id="bottomnav">
            <a ><NavLink to={'/feed'}><DynamicFeedIcon/>feed</NavLink></a>
            <a class="mid"><NavLink to={'/chat'}><ChatIcon/>chat</NavLink></a>
            <a href="#" class="mid"><Co2Icon/>carbon</a>
            <a ><NavLink to={'/earth'}><PublicIcon/>Earth</NavLink></a>
          </div>
        </div>
    </div>
    </>
  )
}

export default footer