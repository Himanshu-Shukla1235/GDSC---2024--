import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";

const GraphicalCFP = () => {
  const [CFPdataByYear, setCFPdataByYear] = useState([]);
  const [dailySum, setDailySum] = useState(null);
  const [GraphBYday, setGraphByday] = useState(null);

  const dayOnly = new Date().getDate();
  const monthOnly = new Date().getMonth() + 1;
  const yearOnly = new Date().getFullYear();

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

    return element;
  };

  const addDailyCFP = async (value) => {
    const data = {
      value: value,
      time: {},
    };

    try {
      await axios.patch("http://localhost:5000/api/v1/footprint/update", data);

      console.log("Daily CFP added successfully");
    } catch (err) {
      console.log("Error in adding CFP by day", err);
    }
  };
  const getailyCFP = async (value) => {
    try {
      const data = await axios.patch(
        "http://localhost:5000/api/v1/footprint/update"
      );

      console.log("Daily CFP getting successfully", data.data.data);
      setGraphByday(data.data.data);
      console.log(GraphBYday);
    } catch (err) {
      console.log("Error in adding CFP by day", err);
    }
  };
  const fetchCFPdataByYear = async () => {
    try {
      const yearlyCFP = await axios.get(
        "http://localhost:5000/api/v1/carbonFootPrint/getCFPwhole"
      );
      setCFPdataByYear(yearlyCFP.data);
    } catch (err) {
      console.log("Error in finding CFP by year", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCFPdataByYear();
    };

    fetchData();
    getailyCFP();
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const dailyCFP = CFPhistorybyday(
      CFPdataByYear,
      dayOnly,
      monthOnly,
      yearOnly
    );
    setDailySum(dailyCFP);
    addDailyCFP(dailyCFP);
  }, [CFPdataByYear, dayOnly, monthOnly, yearOnly]);

  console.log(dailySum);

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
              data: [dailySum || 0],
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
