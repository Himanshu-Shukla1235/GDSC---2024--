import React, { useState, useEffect } from "react";
import "./feed.css";
import Navbar from "../components/Nav";
import Footer from "../components/footer";
import FeedBox from "../components/feedBox";
import Feedbox from "../components/feedBox";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Modalpop from "../components/function components/modalpop";
import Post from "../components/addFeed";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import EmailIcon from "@mui/icons-material/Email";

const feed = () => {
  // responsive part===========================================
  const [navFeed_suggestion, setnavFeed_suggestion] = useState("feed");
  const [feedContainerClassName, setFeedContainerClassName] =
    useState("feedContainer");
  const [isModalOpen5, setIsModalOpen5] = useState(false);

  useEffect(() => {
    console.log(navFeed_suggestion);
    if (navFeed_suggestion == "suggestion") {
      setFeedContainerClassName("feedContainerSuggestion");
    } else if (navFeed_suggestion == "feed") {
      setFeedContainerClassName("feedContainer");
    }
  }, [navFeed_suggestion]);

  const navigateFeedtoSuggestion = async () => {
    await setnavFeed_suggestion("suggestion");
  };

  const navigateSuggestiontoFeed = async () => {
    await setnavFeed_suggestion("feed");
  };

  //setting for screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setnavFeed_suggestion("feed");
      } else {
        setnavFeed_suggestion("suggestion");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  // =========================================================
  // const getFeeds = async () => {
  //   try {
  //   } catch (err) {
  //     console.log("err in getting data from backend", err);
  //   }
  // };
  //write your code from here do not touch responsive part
  //seting the outside click visibility:

  const [allFeeds, setallFeeds] = useState([]);
  const feedGet = async () => {
    try {
      const feeds = await axios.get(
        "http://localhost:5000/api/v1/feed/getfeed"
      );
      console.log("these are all feeds ", feeds.data);
      setallFeeds(feeds.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    feedGet();
  }, []);


  return (
    <>
      <div className="feedBody">
        <header className="header1">
          <Navbar></Navbar>
        </header>
        <main className="mainFeed">
          <div className={feedContainerClassName}>
            <nav className="feed-suggestion">
              <button onClick={() => navigateSuggestiontoFeed()}>feed</button>
              <button onClick={() => navigateFeedtoSuggestion()}>
                suggestion
              </button>
            </nav>

            <div className="feedSection1">
              {" "}
              <div style={{ display: "flex", marginBottom: "30px" }}>Logo</div>
              <Box
                sx={{
                  width: "80%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  overflow: "hidden",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                        </ListItemIcon>
                        <ListItemText primary="name" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <EmailIcon></EmailIcon>
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ color: "green", borderRadius: "6px" }}
                        onClick={() => {
                          setIsModalOpen5(true);
                        }}
                      >
                        <ListItemText primary="Post" sx={{}} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary="Spam" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </div>
            <div className="feedSection2">
              <div className="feedSection21">
                {" "}
                <span style={{ color: "green" }}>FEEDS</span>
              </div>
              {isModalOpen5 && (
                <div className="Post">
                  <Post close={setIsModalOpen5}></Post>
                </div>
              )}
              <div className="feedSection22">
                {allFeeds &&
                  allFeeds
                    .slice()
                    .reverse()
                    .map((item) => (
                      <FeedBox
                        image={item.image}
                        time={item.time.clock}
                        date={item.time.date}
                        name={item.sender.name}
                        descrip={item.description}
                        avatar={item.sender.avatar}
                        comment={item.Comments}
                        feedId={item._id}
                      ></FeedBox>
                    ))}
                {/* {feedDatabase.map((feedget, index) => (
                  <Feedbox key={index}></Feedbox>
                ))}{" "} */}
              </div>{" "}
            </div>
            <div className="feedSection3">
              <span style={{ color: "green" }}>Recomend </span> <div></div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default feed;
