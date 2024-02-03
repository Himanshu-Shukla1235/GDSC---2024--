import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import Navbar from '../components/Nav';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
    <header className='header1'><Navbar></Navbar></header>
    <div className='inputBody'>
    <div  className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form  className="inputForm" action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social inputA"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social inputA"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social inputA"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className='inputSpan'>or use your email for registration</span>
          <input className="loginInput"type="text" placeholder="Name" />
          <input className="loginInput"type="email" placeholder="Email" />
          <input className="loginInput"type="password" placeholder="Password" />
          <button className='inputButton' >Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="inputForm" action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social inputA"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social inputA"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social inputA"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className='inputSpan'>or use your account</span>
          <input className="loginInput"type="email" placeholder="Email" />
          <input className="loginInput"type="password" placeholder="Password" />
          <a className='inputA'href="#">Forgot your password?</a>
          <button className='inputButton'>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className={`overlay-panel overlay-left ${isSignUp ? 'overlay-left-active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p className='inputP'>To keep connected with us please login with your personal info</p>
            <button className="ghost inputButton" onClick={handleToggleForm}>Sign In</button>
          </div>
          <div className={`overlay-panel overlay-right ${isSignUp ? 'overlay-right-active' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p className='inputP'>Enter your personal details and start the journey with us</p>
            <button className="ghost inputButton" onClick={handleToggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AuthForm;
