import React from "react";
import "../components/feedbox.css";
const Feedbox = (props) => {
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
          src="https://github.com/Himanshu-Shukla1235/GDSC---2024--/blob/main/frontend/Evi/public/images/earth%20day.jpg?raw=true"
          alt="image"
        ></img>
      </div>
      <div className="Fb13">hello</div>
    </div>
  );
};



export  default Feedbox ;
