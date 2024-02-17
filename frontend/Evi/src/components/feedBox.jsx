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

const Feedbox = (props) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    console.log("testing image props", props.image);
  }, []);

  return (
    <div className="Fb1">
      <div className="Fb11">
        <div className="fb-time">
          <Avatar src={props.avatar} /> {props.name}
          <span style={{ color: "grey" }}>|{props.time}</span>
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

      <div className="Fb13">
        <div className="discriptionf" style={{ color: "gray" }}>
          {props.descrip}
        </div>
      </div>

      <div className="bottomnavigatef">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label="" icon={<ChatIcon></ChatIcon>} />
          <BottomNavigationAction label="" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default Feedbox;
