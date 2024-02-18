import React, { useState } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../components/carbocal3.css";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

const vehicleTypes = [
  "Car-Type-Mini",
  "Car-Type-Supermini",
  "Car-Type-LowerMedium",
  "Car-Type-UpperMedium",
  "Car-Type-Executive",
  "Car-Type-Luxury",
  "Car-Type-Sports",
  "Car-Type-4x4",
  "Car-Type-MPV",
  "Car-Size-Small",
  "Car-Size-Medium",
  "Car-Size-Large",
  "Car-Size-Average",
  "Motorbike-Size-Small",
  "Motorbike-Size-Medium",
  "Motorbike-Size-Large",
  "Motorbike-Size-Average",
  "Bus-LocalAverage",
  "Bus-Coach",
  "Taxi-Local",
  "Train-National",
  "Train-Local",
  "Train-Tram",
];

const distanceUnits = ["km", "mi"];

const CarbonCalculator = (props) => {
  const [vehicleType, setVehicleType] = useState("");
  const [distanceValue, setDistanceValue] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("mi"); // Default to 'mi'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const dayOnly = new Date().getDate();
  const monthOnly = new Date().getMonth() + 1;
  const yearOnly = new Date().getFullYear();
  const [additioncheck, setAdditionCheck] = useState(false);

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };
  const currentTime = getCurrentTime();

  //-------------------------------------adding the  CFP in database
  const addCFP = async () => {
    const CFPdata = {
      date: {
        day: dayOnly,
        month: monthOnly,
        year: yearOnly,
      },
      time: currentTime,
      carbonFootprint: result.data.co2e_kg,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/v1/carbonFootPrint/addcarbonFootPrint",
        CFPdata
      );
      console.log("CFP data is posted");
      console.log(dayOnly, currentTime);
      props.addlist();
    } catch (err) {
      console.log("err in posting CFP data", err);
    }
  };

  //---------------------------------------------calculate Carbon Footprint

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set("vehicle_type", vehicleType);
    encodedParams.set("distance_value", distanceValue);
    encodedParams.set("distance_unit", distanceUnit);

    const options = {
      method: "POST",
      url: "https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx",
        "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
        "X-RapidAPI-Host": "carbonsutra1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      setError(null);
    } catch (error) {
      setResult(null);
      setError("Error calculating carbon footprint. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", color: "blue", opacity: 0.4 }}>
          Calculate vehicle Carbon Footprint
        </h1>
        <div
          className="form23"
          style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
        >
          <form onSubmit={handleSubmit}>
            <label style={{ marginBottom: "10px" }}>
              Vehicle Type:
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label style={{ marginBottom: "10px" }}>
              Distance Value:
              <input
                type="text"
                value={distanceValue}
                onChange={(e) => setDistanceValue(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </label>
            <br />
            <label style={{ marginBottom: "10px" }}>
              Distance Unit:
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
              >
                {distanceUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Button variant="outlined" type="submit">
                Submit
              </Button>
              {result && <span style={{ marginLeft: "10px" }}> | </span>}
              {result && !additioncheck && (
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    addCFP();
                    setAdditionCheck(true);
                  }}
                >
                  <AddIcon />
                </Fab>
              )}
              {additioncheck && (
                <CheckIcon
                  style={{
                    color: "black",
                    backgroundColor: "greenyellow",
                    borderRadius: "60%",
                    marginLeft:"8px"
                  }}
                ></CheckIcon>
              )}
            </div>
          </form>

          {result && (
            <div style={{ marginTop: "20px" }}>
              <h2>Result:</h2>
              <p>Carbon Footprint: {result.data.co2e_kg} kg</p>
            </div>
          )}

          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default CarbonCalculator;
