import React, { useState } from "react";
import axios from "axios";
import "../components/carbonc.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
const CarbonFootprintCalculator = () => {
  const [countryName, setCountryName] = useState("");
  const [electricityValue, setElectricityValue] = useState("");
  const [electricityUnit, setElectricityUnit] = useState("kWh"); // Default value kWh
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const calculateCarbonFootprint = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("country_name", countryName);
    encodedParams.set("electricity_value", electricityValue);
    encodedParams.set("electricity_unit", electricityUnit);

    const options = {
      method: "POST",
      url: "https://carbonsutra1.p.rapidapi.com/electricity_estimate",
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
      setCarbonFootprint(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="corbmainE">
      <h1 className="carbheadE"> Carbon Footprint From Electricy</h1>
      <div>
        <label style={{ display:"flex",gap:5}}>
          Country Name: 
          <TextField
            required
            id="filled-required"
            label=""
            defaultValue="Hello World"
            size="small"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          {/* <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          /> */}
        </label>
      </div>
      <div>
        <label style={{ display:"flex",gap:5}}>
          Electricity Value:
         
          <TextField
            required
            id="filled-required"
            label=""
           type="number"
            size="small"
            value={electricityValue}
            onChange={(e) => setElectricityValue(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label style={{ display:"flex",gap:8}}>
          Electricity Unit:

          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={electricityUnit}
    label="Age"
    onChange={(e) => setElectricityUnit(e.target.value)}
  >
    <MenuItem value={"kWh"}>kWh</MenuItem>
    <MenuItem value={"MWh"}>MWh</MenuItem>
    
  </Select>
</FormControl>
         
        </label>
      </div>
      <div>
        <Button variant="outlined" onClick={calculateCarbonFootprint}>
          Submit
        </Button>
      </div>
      {carbonFootprint && (
        <div>
          <h2>Carbon Footprint Result:</h2>
          <p>{`Estimated Carbon Footprint: ${carbonFootprint.data.co2e_mt} tons`}</p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
