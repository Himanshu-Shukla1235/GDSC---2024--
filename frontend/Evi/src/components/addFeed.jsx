import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../components/addfeed.css";

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
  const base64Converter = async (File) => {
    if (!(File instanceof Blob)) {
      console.error("Invalid file type. Expected a Blob object.");
      return null;
    }

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(File);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handling image upload
  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Convert and set base64 directly in the state
    try {
      const base64Result = await base64Converter(selectedFile);
      setFeedData({
        ...feedData,
        image: "its image correction runing....",
      });
    } catch (error) {
      console.error("Error converting to base64:", error);
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
  const handleAdd = async () => {
    try {
      // Set the current time before making the API call
      const currentTime = getCurrentTime();
      console.log(currentTime ,new Date().toLocaleDateString())
      setFeedData((prevFeedData) => ({
        ...prevFeedData,
        time: {
          date: new Date().toLocaleDateString(),
          clock: currentTime,
        },
      }));

      // Perform the API call with feedData
      await axios.post("http://localhost:5000/api/v1/feed/createFeed", feedData);

      console.log("Feed added successfully:", feedData);
    } catch (err) {
      console.log("Error in uploading feed", err);
    }
  };

  return (
    <div className="mainupload">
      <button type="submit" onClick={handleAdd}>
        Upload Feed
      </button>
      <input type="file" ref={inputRef} onChange={handleUpload} />
      <div className="setImage">{file && <img src={URL.createObjectURL(file)} alt="" />}</div>

      {/* description */}
      <div className="discriptionf">
        <textarea
          placeholder="Enter your description..."
          value={feedData.description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default AddFeed;
