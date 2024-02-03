import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'

const footer = () => {
  return (
    <>
    <div>
        <div id="homefooter">
        {/* <button onclick="openBottomnav()">O</button> */}

          <div id="bottomnav">
            <a href="#">Feed</a>
            <a class="mid"><NavLink to={'/chat'}>Chat</NavLink></a>
            <a href="#" class="mid">Carbon</a>
            <a href="#">Earth</a>
          </div>
        </div>
    </div>
    </>
  )
}

export default footer