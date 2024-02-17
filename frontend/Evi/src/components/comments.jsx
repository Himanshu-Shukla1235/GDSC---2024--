import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/comments.css";

const MessagesPage = ({ Feedid }) => {
  const [FeedDataById, setFeedDatabyId] = useState([]);
  const [commentText,setcommentText]=useState("")

  const settingCommentsByFeedId = (feedid, Feed) => {
    for (let index = Feed.data.length - 1; index >= 0; index--) {
      if (feedid === Feed.data[index]._id) {
        setFeedDatabyId(Feed.data[index].Comments);
        break;
      }
    }
  };
   //add comments to the feed
   const addcomment=async()=>{
    const commentdata={
        comment:{commentText}
    }
    try{

    }catch(err){
        console.log(err)
    }
   }

  const getCommentsData = async () => {
    try {
      const feeds = await axios.get("http://localhost:5000/api/v1/feed/getfeed");
      console.log("these are all feeds ", feeds.data[31].Comments);
      settingCommentsByFeedId(feeds.data[31]._id, feeds);
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
          {FeedDataById.map((item, index) => (
            <div  className="commentShowBox">
              {item}
            </div>
          ))}
        </div>
        <div className="addComments">
          <textarea
            id="message"
            placeholder="Enter your comment..."
            style={{ width: "70%" }}
            value={commentText}
            onChange={(e)=>(setcommentText(e.target.value))}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
