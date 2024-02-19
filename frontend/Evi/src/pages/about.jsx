// AboutPage.jsx

import React, { useEffect } from "react";
import gsap from "gsap";
import "./about.css";
const AboutPage = () => {
  

  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to our Climate Action website! We are a global community of
          individuals, activists, and organizations united by our commitment to
          address the pressing issues of climate change and environmental
          sustainability.
        </p>
        <p>
          Our platform serves as a hub for information, collaboration, and
          collective action. Whether you're a climate enthusiast, a seasoned
          environmentalist, or someone taking their first steps towards
          sustainability, you'll find a supportive community here.
        </p>
        <h3>Our Aims</h3>
        <p>
          <strong>1. Raise Awareness:</strong> Our primary aim is to raise
          awareness about the urgent need for climate action and environmental
          conservation. Through accessible information and engaging content, we
          strive to empower individuals to understand and address the challenges
          we face.
        </p>
        <p>
          <strong>2. Foster Collaboration:</strong> We believe in the power of
          collaboration. By providing a platform where individuals and
          organizations can connect, share ideas, and work together on projects,
          we aim to amplify the impact of collective efforts.
        </p>
        <p>
          <strong>3. Empower Change:</strong> Our goal is to empower individuals
          to make sustainable choices in their daily lives. Whether it's through
          our carbon calculator, climate data, or collaborative projects, we
          want to inspire positive change on both individual and community
          levels.
        </p>
        <p>
          <strong>4. Support Innovation:</strong> We encourage and support
          innovative solutions to address climate challenges. Our community
          fosters creativity and the development of projects that contribute to
          a more sustainable and resilient future.
        </p>
        <h3>Features</h3>
        {/* ... (rest of the sections remain unchanged) */}
        <p>
          Join us in our mission to create a sustainable future for our planet.
          Together, we can make a significant difference!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
