import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "../components/carbonc2.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
const CarbonFootprintCalculator = () => {
  const [fuelUsage, setFuelUsage] = useState("");
  const [fuelName, setFuelName] = useState("");
  const [fuelValue, setFuelValue] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const handleCalculate = async () => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("fuel_usage", fuelUsage);
      encodedParams.set("fuel_name", fuelName);
      encodedParams.set("fuel_value", fuelValue);

      const options = {
        method: "POST",
        url: "https://carbonsutra1.p.rapidapi.com/fuel_estimate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx",
          "X-RapidAPI-Key":
            "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
          "X-RapidAPI-Host": "carbonsutra1.p.rapidapi.com",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      setCarbonFootprint(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fuelCategories = [
    "Premium Petrol",
    "Regular Petrol",
    "Coal - Default",
    "Coal - Bituminous",
    "Coal - Sub-Bituminous",
    "Coal - Lignite",
    "Diesel",
    "LPG",
    "Heavy Fuel Oil",
    "Light Fuel Oil",
    "Natural Gas",
    "Aviation fuel - Kerosene",
    "Aviation gas",
  ];

  return (
    <div className="corbmainF">
      <h1 className="carbheadF ">Carbon Footprint Calculator</h1>

      <label style={{ display: "flex", gap: 5, fontSize: 27 }}>
        Fuel Usage:
        <select
          value={fuelUsage}
          onChange={(e) => setFuelUsage(e.target.value)}
        >
          <option value="transport">Transport</option>
          <option value="industrial">Industrial</option>
          <option value="commercial">Commercial</option>
          <option value="residential">Residential</option>
        </select>
      </label>

      <label style={{ display: "flex", gap: 5,fontSize:27 }}>
        Fuel Category:
        <select value={fuelName} onChange={(e) => setFuelName(e.target.value)}>
          <option value="">Select Fuel Category</option>
          {fuelCategories.map((category) => (
            <option
              key={category}
              value={category}
              style={{ borderColor:"blue"}}
            >
              {category}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "flex", gap: 5,fontSize:27 }}>
        Fuel Value:
        <input
          type="text"
          value={fuelValue}
          onChange={(e) => setFuelValue(e.target.value)}
        />
      </label>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:20}}>
        <Button variant="outlined" onClick={handleCalculate}>
          Submit
        </Button>
        {carbonFootprint&&<h4>|</h4>}{carbonFootprint&&<Fab
            color="primary"
            aria-label="add"
            size="small"
            sx={{  }}
          >
            <AddIcon />
          </Fab>}
      </div>

      {carbonFootprint && (
        <div>
          <h2>Carbon Footprint Result:</h2>
          <pre>{JSON.stringify(carbonFootprint.data.co2e_kg, null, 2)} kg</pre>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
