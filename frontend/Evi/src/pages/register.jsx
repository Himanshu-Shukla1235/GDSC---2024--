import React from "react";
import { useState } from "react";
import "./Regester.css";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Navbar from "../components/Nav";

const Regester = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   const response=fetch()
    console.log("Registration data:", formData);
  };

  return (
    <>
    <header><Navbar></Navbar></header>
      <main className="main">
        <div className="form">
          <form className="Form">
          <h1 style={{ color: "green", fontFamily: "sans-serif", fontSize: 30 }}>
        Signup
        </h1>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // placeholder="Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              // placeholder="Email"
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              // placeholder="Phone"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // placeholder="Password"
              required
            />

            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              // placeholder="confirm Passoword"
              required
            />

            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "green", height: 25 ,width:115,borderRadius:13}}
            >
              Submit
            </Button>
            <div className="Loginopt">
              {" "}
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 24, height: 24 }}
                  src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                />
                <Avatar
                  alt="Travis Howard"
                  sx={{ width: 24, height: 24 }}
                  src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                />
                <Avatar
                  alt="Cindy Baker"
                  sx={{ width: 24, height: 24 }}
                  src=""
                />
              </Stack>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Regester;
