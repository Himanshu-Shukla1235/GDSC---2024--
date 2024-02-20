import React, { useState, useEffect } from "react";
import axios from "axios";

const GraphicalCFP = () => {
  const [CFPdataByYear, setCFPdataByYear] = useState([]);

  const fetchCFPdataByYear = async () => {
    try {
      console.log("by yearly");
      const yearlyCFP = await axios.get(
        "http://localhost:5000/api/v1/carbonFootPrint/getCFPwhole"
      );
      console.log()
      setCFPdataByYear(yearlyCFP.data);
      // Note: I corrected the state variable name from 'todayCFP' to 'yearlyCFP'
    } catch (err) {
      console.log("err in finding CFP by year", err);
    }
  };

  useEffect(() => {
    fetchCFPdataByYear();
  }, []);

  return <div>hii</div>;
};

export default GraphicalCFP;
