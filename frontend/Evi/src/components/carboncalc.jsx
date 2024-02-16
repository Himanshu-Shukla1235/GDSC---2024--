import React, { useState } from "react";
import axios from "axios";
import "../components/carbonc.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
const CarbonFootprintCalculator = (props) => {
  const [countryName, setCountryName] = useState("");
  const [electricityValue, setElectricityValue] = useState("");
  const [electricityUnit, setElectricityUnit] = useState("kWh"); // Default value kWh
  const [carbonFootprint, setCarbonFootprint] = useState(null);
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
    console.log("with", carbonFootprint.data.co2e_kg);
    const CFPdata = {
      date: {
        day: dayOnly,
        month: monthOnly,
        year: yearOnly,
      },
      time: currentTime,
      carbonFootprint: carbonFootprint.data.co2e_kg,
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
        <label style={{}}>
          Country Name:
          <TextField
            sx={{ width: "70%", marginBottom: "0px", height: "0px" }} // Adjust the width and add margin bottom
            required
            id="1"
            label="country"
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
        <label style={{}}>
          Electricity Value:
          <TextField
            required
            id="2"
            type="number"
            size="small"
            value={electricityValue}
            onChange={(e) => setElectricityValue(e.target.value)}
          />
        </label>
      </div>
      <div className="inputBox">
        <label style={{ gap: "1rem" }}>
          Electricity Unit:
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              style={{ height: "2em" }}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Button variant="outlined" onClick={calculateCarbonFootprint}>
          Submit
        </Button>{" "}
        {carbonFootprint && <h4>|</h4>}
        {carbonFootprint && !additioncheck && (
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            sx={{}}
            onClick={() => {
              addCFP();
              setAdditionCheck(true);
            }}
          >
            <AddIcon />
          </Fab>
        )}
        {additioncheck &&  (
          <CheckIcon style={{color:"black",backgroundColor:"greenyellow",borderRadius:'60%',}} ></CheckIcon>
        )}
      </div>
      {carbonFootprint && (
        <div>
          <h2>Carbon Footprint Result:</h2>

          <p>{`Estimated Carbon Footprint: ${carbonFootprint.data.co2e_kg} kg`}</p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
