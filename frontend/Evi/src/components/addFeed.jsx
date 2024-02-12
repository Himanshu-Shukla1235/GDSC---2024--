import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "axios";
import "../components/addfeed.css";
//---------------------------------------------------------------------------------------------
const AddFeed = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const [feedData,setFeedData]
=useState({
    
})
  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const addFeedData = await axios.post();
    } catch (err) {
      console.log("error in uploading feed", err);
    }
  };
  useEffect(() => {
    console.log("this is", file);
  }, [file]);

  return (
    <div className="mainupload">
      <button type="submit" onClick={handleAdd}></button>
      <input type="file" ref={inputRef} onChange={handleUpload} />
      <div className="setImage">
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </div>
    </div>
  );
};

export default AddFeed;
