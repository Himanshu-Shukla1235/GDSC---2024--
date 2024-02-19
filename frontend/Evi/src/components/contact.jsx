import React from "react";
import "./contact.css";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
const contact = () => {
  return (
    <>
      <div className="contactContainer">
        <div className="heading">
          {" "}
          <h1>Contact Us</h1>
        </div>
        <div className="contactWays">
          <div className="boxWay">
            <EmailIcon
              className="contactWayItem"
              style={{ fontSize: "1.4em" }}
              onClick={() => {
                const gmailComposeUrl = `mailto:${"amangubrele01@gmail.com"}`;
                window.location.href = gmailComposeUrl;
              }}
            />

            <p style={{ fontSize: "0.5em", width: "300px" }}>
              Just send us your questionor concerns by sending an email and we
              will give you the help you need.
            </p>
          </div>

          <div>
            <WhatsAppIcon
              className="contactWayItem"
              style={{ fontSize: "1.4em" }}
              onClick={() => {
                const whatsappUrl = `https://wa.me/${+917987708692}`;
                window.open(whatsappUrl, "_blank");
              }}
            />
            <p style={{ fontSize: "0.5em", width: "300px" }}>
              Just send us your questionor concerns by sending an email and we
              will give you the help you need.
            </p>
          </div>
          <div>
            <InstagramIcon
              className="contactWayItem"
              style={{ fontSize: "1.4em" }}
            />
            <p style={{ fontSize: "0.5em", width: "300px", marginTop: "30px" }}>
              Just send us your questionor concerns by sending an email and we
              will give you the help you need.
            </p>
          </div>
          <div>
            <a>logo</a>
            <p style={{ fontSize: "0.5em", width: "300px" }}>
              contact from here itself.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
import "./contact.css";

export default contact;
