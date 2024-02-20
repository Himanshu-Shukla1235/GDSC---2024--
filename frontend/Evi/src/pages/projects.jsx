// ClimateProjects.js

import React from "react";
import "./project.css"; // Import the CSS file for styling

const ClimateProjects = () => {
  const projects = [
    {
      name: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo.",
    },
    {
      name: "Project 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more projects as needed
  ];

  return (
    <div className="climate-projects-container">
      <h1>Currently Running Climate Projects</h1>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button
              onClick={() =>
                window.alert(`Explore more about ${project.name}`)
              }>
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClimateProjects;
