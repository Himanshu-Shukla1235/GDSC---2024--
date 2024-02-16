import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../components/addfeed.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const AddFeed = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const [feedData, setFeedData] = useState({
    description: "",
    image: "",
    time: {
      date: "",
      clock: "",
    },
    location: "",
  });

  // Function to convert image into base64

  // Handling image upload
  // Handling image upload
const handleUpload = async (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);

  try {
    // Upload file and get the image URL
    const imgUrl = await uploadFile(selectedFile);

    // Set the image URL in the feedData state
    setFeedData({
      ...feedData,
      image: `this is ${imgUrl}`,
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

    //====aman=================imgUrl has the url of image
    const img = await uploadFile(file);
    setImgUrl(img);
    console.log(imgUrl);
    //===========================

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
  const [imgUrl, setImgUrl] = useState();

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "dydbv12n6";
      let resourceType = "image";
      let api = `http://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const transformations = [{ width: 300, height: 300, crop: "fill" }];
      axios.defaults.headers.common["Authorization"] = undefined;
      const res = await axios.post(api, data);

      //re
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      }

      const { secure_url } = res.data;
      // console.log(secure_url);
      setImgUrl(secure_url);

      return secure_url;
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <div className="mainupload">
      <form>
        <button type="submit" onClick={(e) => handleAdd(e)}>
          Upload Feed
        </button>
       
        <input
          id="fileInput"
          type="file"
          ref={inputRef}
          onChange={handleUpload}
          required
          style={{ display: "none" }}
        />
        <div className="setImage">
          {file && <img src={URL.createObjectURL(file)} alt="" />} <label htmlFor="fileInput">
         {!file &&<AddPhotoAlternateIcon style={{ fontSize: "300px", opacity: 0.5 }} />} 
        </label>
        </div>

        {/* description */}
        <div className="discriptionf">
          <textarea
            placeholder="Enter your description..."
            value={feedData.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </form>
    </div>
  );
};

export default AddFeed;
