import React, { useState, useEffect } from "react";
import "./feed.css";
import Navbar from "../components/Nav";
import Footer from "../components/footer";

import FeedBox from "../components/feedBox";
import Feedbox from "../components/feedBox";
const feed = () => {
  // responsive part===========================================
  const [navFeed_suggestion, setnavFeed_suggestion] = useState("feed");
  const [feedContainerClassName, setFeedContainerClassName] =
    useState("feedContainer");

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
  const feedGet = async () => {
    const feeds = await axios.get();
  };
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
            <div className="feedSection1">hi</div>
            <div className="feedSection2">
              <div className="feedSection21"></div>
              <div className="feedSection22">
                {" "}
                <Feedbox ></Feedbox>
                <Feedbox ></Feedbox>
                <Feedbox ></Feedbox>
                {/* {feedDatabase.map((feedget, index) => (
                  <Feedbox key={index}></Feedbox>
                ))}{" "} */}
              </div>{" "}
            </div>
            <div className="feedSection3">sugg</div>
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
