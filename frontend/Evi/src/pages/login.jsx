import React, { useState } from "react";
import "./Login.css"; // Import your CSS file
import Navbar from "../components/Nav";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faBars } from "@fortawesome/free-solid-svg-icons";
// const errorMessages=(
//   emptyInputFields:'Please provide credentials',
//   confirmPassword:'your password does not matches',
//   userNotFound:'no user found',
//   emailFormat:'please enter correct email'
// )
const errorMessages = {
  emptyInputFields: "Please provide credentials",
  confirmPassword: "Your password does not match",
  userNotFound: "No user found",
  emailFormat: "Please enter a correct email",
};

const AuthForm = () => {
  const [login, setLogin] = useState(true);
  const [header, setHeader] = useState("Login");
  const [option, setOption] = useState("register");

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const setSignUp = () => {
    if (login === true) {
      setHeader("Register");
      setLogin(false);
      setOption("login");
      setError("");
    } else {
      setHeader("Login");
      setLogin(true);
      setOption("register");
      setError("");
    }
  };

  const onChangeSendMessage = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoaderClass("");
    if (login === true) {
      const person = { email: formData.email, password: formData.password };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          person
        );
        setError("");

        const token = res.data.token;
        console.log(res);

        // Store the token in localStorage
        localStorage.setItem("token", token);
        console.log(localStorage.getItem("token"));

        // Set the Authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const id = res.data.user.id;
        axios.defaults.headers.common["userID"] = id;
        window.location.href = "/";
      } catch (error) {
        setError(error.response.data.msg);
        setLoaderClass("spinnerLoader");
      }

      console.log(person);
    } else {
      // Registration logic
      setLoaderClass('');
      console.log(
        "Registering with:",
        formData.username,
        formData.email,
        formData.password
      );
      const person = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      };
      if (formData.password == formData.confirmPassword) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/v1/auth/register",
            person
          );
          setError("");
          // Store the token in localStorage
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log(localStorage.getItem(token));

          // Set the Authorization header for future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          window.location.href = "/";
        } catch (error) {
          setError(error.response.data.msg);
          setLoaderClass("spinnerLoader");
        }
      } else {
        setError(errorMessages.confirmPassword);
        setLoaderClass("spinnerLoader");
      }
    }
  };

  const [loaderClass, setLoaderClass] = useState("spinnerLoader");

  return (
    <>
      <header className="header1">
        <Navbar></Navbar>
      </header>
      <div className="loginBody">
        <div className="loginContainer">
          <h2 className="loginHeading">{header}</h2>
          <div className="inner">
            <form className="loginForm" onSubmit={submitLoginForm}>
              <input
                onChange={onChangeSendMessage}
                className="loginInput"
                id="email"
                type="text"
                placeholder="email"
                value={formData.email}
              />

              {!login && (
                <>
                  <input
                    onChange={onChangeSendMessage}
                    className="loginInput"
                    id="username"
                    type="text"
                    placeholder="username"
                    value={formData.username}
                  />
                </>
              )}

              <input
                onChange={onChangeSendMessage}
                className="loginInput"
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
              />

              {!login && (
                <>
                  <input
                    onChange={onChangeSendMessage}
                    className="loginInput"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                  />
                </>
              )}

              <button className="loginButton" type="submit">
                <h2 style={{ fontWeight: 8, cursor: "pointer" }}>Submit</h2>
                <i
                  id="loader"
                  className="fa-solid fa-spinner fa-spin-pulse"></i>
                <FontAwesomeIcon
                  className={loaderClass}
                  icon={faSpinner}
                  rotation={270}
                  spin
                  style={{ color: "#4f33a3" }}
                />
              </button>

              <div className="errorHandler">
                <p className="errorLogin">{error}</p>
              </div>

              <a className="loginRegister" onClick={setSignUp}>
                {option}
              </a>
            </form>
            <p className="secretid"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
