import React from "react";
import "../components/feedbox.css";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Feedbox = (props) => {
  const [value, setValue] = React.useState(0);
  return (
    <div className="Fb1">
      <div className="Fb11">
        <div className="fb-time">
          {props.name}
          <span style={{ color: "grey" }}>|{props.time}</span>
        </div>
        <div className="fb-bar"></div>
      </div>
      <div className="Fb12">
        <img
          src={props.image}
          alt="image"
        ></img>
      </div>
      <div className="Fb13">
        {" "}
        <div className="discriptionf">
        
       
        </div>
        
      </div>
      <div className="bottomnavigatef"> <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
</BottomNavigation></div>
    </div>
  );
};

export default Feedbox;
