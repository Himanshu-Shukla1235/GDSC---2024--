import React, { useEffect, useState } from "react";
import "../components/feedbox.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import Commentsin from "../components/comments"

const Feedbox = (props) => {
  const [value, setValue] = React.useState(0);
  const [commentopen,setcommentopen]=useState(false)

  useEffect(() => {
    console.log("testing image props", props.image);
  }, []);

  //aman write from here

  //-----------------------------------------------------

  return (
    <>
      <div className="Fb1">

        <div className="Fb11">
          {/* //avatar */}
          <div className="fb-time">
            <Avatar src={props.avatar} /> {props.name}
            <span style={{ color: "grey" }}>|{props.time} | {props.date}</span>
          </div>
          <div className="fb-bar"></div>
        </div>

        {props.image !== null &&
        props.image !== "undefined" &&
        props.image !== "" ? (
          <div className="Fb12">
            <img src={props.image} alt="image" />
          </div>
        ) : null}

        <div className="Fb13">{props.descrip}</div>

        <div className="bottomnavigatef">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="" icon={<ChatIcon ></ChatIcon>}  onClick={setcommentopen} />
            <BottomNavigationAction label="" icon={<FavoriteIcon />}  onClick={()=>{
              setcommentopen(false)
            }}/>
            <BottomNavigationAction label="" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </div>
        {commentopen && (<div className="comments"><Commentsin Feedid={props.feedId}></Commentsin></div>)}
        
      </div>
    </>
  );
};

export default Feedbox;
