import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import Navbar from '../components/Nav';

const AuthForm = () => {
  const [login,setLogin]=useState(true);
  const [header,setHeader]=useState('Login');
  const [option,setOption]=useState('register')

  const setSignUp=()=>{
   if(login==true)
   {
     setHeader('Register')
    setLogin(false);
    setOption('login');
   }
   else{
    setHeader('Login')
    setLogin(true);
    setOption('register');
   }
  }


 

  return (
  <>
    <header className='header1'>
      <Navbar></Navbar>
    </header>
    <div className="loginBody">
      <div className="loginContainer">
        <h2 className='loginHeading' >{header}</h2>
      <div className="inner">
        <form className='loginForm' id="form">
          <input className="loginInput"id="username" type="text" placeholder="Username" />
          {!login && (
                // Additional input fields for the 'regiseter' state
                <>
                  
                  <input className="loginInput" id="loginAdditionalField" type="text" placeholder="email" />
                </>
              )}
          <input className="loginInput" id="password" type="password" placeholder="Password" />
          <button className='loginButton' type="submit">
            Submit<i id="loader" className="fa-solid fa-spinner fa-spin-pulse"></i>
          </button>

          <a className='loginRegister' onClick={setSignUp}>{option}</a>
        </form>
        <p className="secretid"></p>
      </div>
    </div>
    </div>
  </>
);

};

export default AuthForm;
