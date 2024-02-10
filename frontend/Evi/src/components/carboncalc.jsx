import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Carbon Footprint Calculator</h1>
      <div>
        <label>
          Country Name:
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Electricity Value:
          <input
            type="text"
            value={electricityValue}
            onChange={(e) => setElectricityValue(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Electricity Unit:
          <select
            value={electricityUnit}
            onChange={(e) => setElectricityUnit(e.target.value)}
          >
            <option value="kWh">kWh</option>
            <option value="MWh">MWh</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={calculateCarbonFootprint}>
          Calculate Carbon Footprint
        </button>
      </div>
      {carbonFootprint && (
        <div>
          <h2>Carbon Footprint Result:</h2>
          <p>{`Estimated Carbon Footprint: ${carbonFootprint.data.co2e_lb}`}</p>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
