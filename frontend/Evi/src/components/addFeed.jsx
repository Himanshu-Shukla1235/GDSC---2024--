import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../components/addfeed.css";

const AddFeed = () => {
  const [file, setFile] = useState(null);
  const [base64file, setBase64File] = useState(null);
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
  const base64Converter = (File) => {
    if (!(File instanceof Blob)) {
      console.error("Invalid file type. Expected a Blob object.");
      return;
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

  useEffect(() => {
    if (file) {
      base64Converter(file)
        .then((base64Result) => {
          setBase64File(base64Result);
        })
        .catch((error) => {
          console.error("Error converting to base64:", error);
        });
    }
  }, [file]);

  // Handling upload
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Handle add
  const handleAdd = async () => {
    try {
      // Perform the API call with feedData
      setFeedData({
        ...feedData,
        image: base64file,
      });
      await axios.post("http://localhost:5000/feed/createFeed", feedData);

      console.log("Feed added successfully:", feedData.data);
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
      <div className="setImage">
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </div>
    </div>
  );
};

export default AddFeed;
