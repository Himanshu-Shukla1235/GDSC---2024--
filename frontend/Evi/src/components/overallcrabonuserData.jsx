import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";

const GraphicalCFP = () => {
  const [CFPdataByYear, setCFPdataByYear] = useState([]);
  const [CFpdataBymonth, setCFpdataBymonth] = useState([]);
  const [byday, setbyday] = useState([]);
  const dayOnly = new Date().getDate();
  const monthOnly = new Date().getMonth() + 1;
  const yearOnly = new Date().getFullYear();

  const CFPhistorybyday = (CFPByyear, date, month, year) => {
    const element = 0;

    for (let index = 0; index < CFPByyear.length; index++) {
      if (
        CFPByyear[index].date.day == date &&
        CFPByyear[index].date.month == month &&
        CFPByyear[index].date.year == year
      ) {
        element += CFPByyear[index].carbonFootprint;
      }
    }
    return element;
  };

  const fetchCFPdataByYear = async () => {
    try {
      console.log("by yearly");
      const yearlyCFP = await axios.get(
        "http://localhost:5000/api/v1/carbonFootPrint/getCFPwhole"
      );
      console.log(yearlyCFP.data[1].date.day);
      setCFPdataByYear(yearlyCFP.data);
      // Note: I corrected the state variable name from 'todayCFP' to 'yearlyCFP'
    } catch (err) {
      console.log("err in finding CFP by year", err);
    }
  };

  useEffect(() => {
    fetchCFPdataByYear();
    const x = CFPhistorybyday(CFPdataByYear,dayOnly,monthOnly,yearOnly);
    console.log(x);
  }, []);

  return (
    <>
      <div className="mainOveallCarbo"></div>
      <div className="O.C.U">heading</div>
      <div>
        {" "}
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  );
};

export default GraphicalCFP;
