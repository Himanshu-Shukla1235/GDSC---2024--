import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";

const GraphicalCFP = () => {
  const [CFPdataByYear, setCFPdataByYear] = useState([]);
  const dayOnly = new Date().getDate();
  const monthOnly = new Date().getMonth() + 1;
  const yearOnly = new Date().getFullYear();
  const [dayCFPhistory, setdayCFPhistory] = useState();

  const CFPhistorybyday = (CFPByyear, date, month, year) => {
    let element = 0;

    for (let index = 0; index < CFPByyear.length; index++) {
      if (
        CFPByyear[index].date.day === date &&
        CFPByyear[index].date.month === month &&
        CFPByyear[index].date.year === year
      ) {
        element += CFPByyear[index].carbonFootprint;
      }
    }
    setdayCFPhistory(element);
    return element;
  };

  // const addDailyCFP = () => {
  //   const data = {
  //     value: dayCFPhistory,
  //     time: {
  //       date: "",
  //       month: "",
  //       year: "",
  //     },
  //   };
  //   try {
  //     axios.patch("http://localhost:5000/api/v1/footprint/update", data);
  //   } catch (err) {
  //     console.log("err in ading CFP by day", err);
  //   }
  // };
  // useEffect(() => {
  //   addDailyCFP();
  // }, [dayCFPhistory]);

  // const updateDailyCFP = {};

  // const getDailyCFP = {};

  const fetchCFPdataByYear = async () => {
    try {
      const yearlyCFP = await axios.get(
        "http://localhost:5000/api/v1/carbonFootPrint/getCFPwhole"
      );
      setCFPdataByYear(yearlyCFP.data);
    } catch (err) {
      console.log("err in finding CFP by year", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCFPdataByYear();
    };

    fetchData();
   
  }, []); // Empty dependencies array to run only on mount

  const x = CFPhistorybyday(CFPdataByYear, dayOnly, monthOnly, yearOnly);
  console.log(x);

  return (
    <>
      <div className="mainOveallCarbo"></div>
      <div className="O.C.U">heading</div>
      <div>
        <LineChart
          xAxis={[
            {
              data: [
                1, 2, 3, 5, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 27, 28, 29, 30,
              ],
            },
          ]}
          series={[
            {
              data: [
                CFPhistorybyday(CFPdataByYear, dayOnly, monthOnly, yearOnly),
              ],
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
