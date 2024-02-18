import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/comments.css";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const MessagesPage = ({ Feedid }) => {
  const [FeedDataById, setFeedDatabyId] = useState([]);
  const [commentText, setcommentText] = useState("");

  const settingCommentsByFeedId = (feedid, Feed) => {
    for (let index = Feed.data.length - 1; index >= 0; index--) {
      if (feedid === Feed.data[index]._id) {
        setFeedDatabyId(Feed.data[index].Comments);
        break;
      }
    }
  };
  //add comments to the feed
  const addcomment = async () => {
    const commentdata = {
      comment: commentText,
      id: Feedid,
    };

    // Split the commentText into words using regex
    const words = commentText.match(/\S+/g) || [];

    // Check if the word count exceeds 70
    if (words.length > 70) {
      alert("Exceeded word limit (70 words).");
      return;
    }
    try {
      await axios.patch(
        "http://localhost:5000/api/v1/feed/addComment",
        commentdata
      );
      getCommentsData();
      setcommentText(""); // Clear the textarea after adding the comment
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentsData = async () => {
    try {
      const feeds = await axios.get(
        "http://localhost:5000/api/v1/feed/getfeed"
      );

      console.log("these are all feeds ", feeds.data);
      settingCommentsByFeedId(Feedid, feeds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommentsData();
  }, []);

  return (
    <>
      <div className="comentsMain">
        <div className="allcomments">
          {FeedDataById &&
            FeedDataById.slice()
              .reverse()
              .map((item) => (
                <>
                  <div className="commentShowBox">
                    <Avatar
                      alt=""
                      src={item.sender.avatar}
                      sx={{ width: 33, height: 33, marginBottom: "15%" }}
                      style={{}}
                    ></Avatar>
                    <div
                      style={{
                        borderLeft: "1px solid #ccc",
                        height: "100px",
                        margin: "0 10px",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "95%",

                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        wordWrap: "break-word", // Enable word wrapping
                        height: "10em",
                        padding: "0.4em",
                      }}
                    >
                      <h1 style={{ fontSize: "1em", color: "black" }}>
                        {item.sender.name}{" "}
                        <span
                          style={{
                            fontSize: "1em",
                            color: "grey",
                            fontWeight: 10,
                          }}
                        >
                          | {item.time} |{" "}
                        </span>
                      </h1>
                      <p style={{}}>{item.comment}</p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: "10%",
                          opacity: 0.3,
                          gap: "0.8em",
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "end",
                          
                        }}
                      >
                        {" "}
                        <ThumbUpAltIcon
                          style={{ fontSize: "1.1em" }}
                        ></ThumbUpAltIcon>{" "}
                        <EditIcon style={{ fontSize: "1.1em" }}></EditIcon>
                      </div>
                    </div>
                  </div>
                </>
              ))}
        </div>
        <div className="addComments">
          <textarea
            id="message"
            placeholder="Enter your comment..."
            style={{
              width: "70%",
              height: "3em",
              padding: "0.4em",
              borderRadius: "7px",
            }}
            value={commentText}
            onChange={(e) => setcommentText(e.target.value)}
          ></textarea>
          <button
            onClick={addcomment}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <SendIcon></SendIcon>
          </button>
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
