import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../components/addfeed.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
const AddFeed = (props) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const [feedData, setFeedData] = useState({
    description: "",
    image: "", // Storing image URL directly
    time: {
      date: "",
      clock: "",
    },
    location: "",
  });

  // Function to convert image into base64

  // Handling image upload
  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    try {
      // Upload file and get the image URL directly set in feedData
      setFeedData({
        ...feedData,
        image: await uploadFile(selectedFile),
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Handle text input for description
  const handleDescriptionChange = (e) => {
    setFeedData({
      ...feedData,
      description: e.target.value,
    });
  };

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  // Handle add
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Set the current time before making the API call
      const currentTime = getCurrentTime();
      console.log(currentTime, new Date().toLocaleDateString());
      setFeedData((prevFeedData) => ({
        ...prevFeedData,
        time: {
          date: new Date().toLocaleDateString(),
          clock: currentTime,
        },
      }));

      // Perform the API call with feedData
      await axios.post(
        "http://localhost:5000/api/v1/feed/createFeed",
        feedData
      );

      console.log("Feed added successfully:", feedData);
    } catch (err) {
      console.log("Error in uploading feed", err);
    }
  };

  // upload url generation function
  const uploadFile = async (selectedFile) => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "dydbv12n6";
      let resourceType = "image";
      let api = `http://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const transformations = [{ width: 300, height: 300, crop: "fill" }];
      axios.defaults.headers.common["Authorization"] = undefined;
      const res = await axios.post(api, data);

      // Set the image URL directly in feedData
      const { secure_url } = res.data;
      setFeedData((prevFeedData) => ({
        ...prevFeedData,
        image: secure_url,
      }));

      // Restore Authorization header
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      }

      return secure_url;
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <>
      <div className="mainupload">
        <form>
          <Tooltip
            title="Post Your Feed"
            style={{ fontSize: "40px", fontFamily: "sans-serif" }}
          >
            {" "}
            <Button
              sx={{
                backgroundColor: "rrgba(0, 255, 0, 0.5))",
                marginBottom: "7px",
                color: "whitesmoke",
                border: "none",
                opacity: 0.9,
              }}
              variant="contained"
              type="submit"
              onClick={(e) => {
                handleAdd(e);
                props.close(false);
              }}
            >
              POST
            </Button>
          </Tooltip>
          <Tooltip  title="Post "
            style={{ fontSize: "40px", fontFamily: "sans-serif" }}><CloseIcon
            onClick={() => {
              props.close(false);
            }}
            style={{
              marginLeft: "670px",
              marginBottom: "100px",
              fontSize: "50px",
              position: "absolute",
              zIndex: "500",
            }}
          ></CloseIcon></Tooltip>
          

          <input
            id="fileInput"
            type="file"
            ref={inputRef}
            onChange={handleUpload}
            required
            style={{ display: "none" }}
          />
          <div className="setImage">
            {file && <img src={URL.createObjectURL(file)} alt="" />}{" "}
            <label htmlFor="fileInput">
              {!file && (
                <div className="addphoto">
                  {" "}
                  <Tooltip
                    title="Add Photo"
                    style={{ fontSize: "40px", fontFamily: "sans-serif" }}
                  >
                    {" "}
                    <AddPhotoAlternateIcon
                      style={{
                        fontSize: "200px",
                        opacity: 0.7,
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </label>
          </div>

          {/* description */}
          <div className="discriptionff">
            <textarea
              style={{ border: "none" }}
              placeholder="Enter your description..."
              value={feedData.description}
              onChange={handleDescriptionChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFeed;
