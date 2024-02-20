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

  const getailyCFP = async () => {
    try {
      const data = await axios.patch(
        "http://localhost:5000/api/v1/footprint/update"
      );

      console.log("Daily CFP getting successfully", data.data.data);
      setGraphByday(data.data.data);
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
      getailyCFP();
    };

    fetchData();
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
      <div
        className="mainOveallCarbo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: '2em'
        }}
      >
        {" "}
        <div className="O.C.U" style={{ fontSize: "2em" }}>
          Overview your C.F.P graph{" "}
        </div>
        <div>
          {GraphBYday && GraphBYday.length > 0 ? (
            <LineChart
              xAxis={[
                {
                  data: GraphBYday.map((item) => item.time.date),
                },
              ]}
              series={[
                {
                  data: GraphBYday.map((item) => item.value),
                },
              ]}
              width={600}
              height={400}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphicalCFP;
