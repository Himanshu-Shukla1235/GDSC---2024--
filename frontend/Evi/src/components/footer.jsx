import React, { useState,useEffect } from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'

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
            <a href="#">Feed</a>
            <a class="mid"><NavLink to={'/chat'}>Chat</NavLink></a>
            <a href="#" class="mid">Carbon</a>
            <a href="/earth">Earth</a>
          </div>
        </div>
    </div>
    </>
  )
}

export default footer